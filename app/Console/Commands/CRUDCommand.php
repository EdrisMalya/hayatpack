<?php

namespace App\Console\Commands;

use App\Models\Permission;
use App\Models\PermissionGroup;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class CRUDCommand extends Command
{
    protected $signature = 'make:crud {model}';

    protected $description = 'This command will generate crud operations for given model';

    public function handle()
    {
        $has_image = false;
        $with_image = $this->ask('With image?N');
        if ($with_image && $with_image == 'Y') {
            $has_image = true;
        }
        $model_name = ucfirst($this->argument('model'));
        $model_table_name = strtolower(Str::plural($model_name));
        $web_routes_file = base_path('routes/web.php');
        $sidebar_links = base_path('resources/js/Components/SidebarLinks.jsx');
        $web_routes_file_string = File::get($web_routes_file);
        $sidebar_links_string = File::get($sidebar_links);

        if (File::exists(base_path('/app/Models/'.$model_name.'.php'))) {
            $table_columns = Schema::getColumnListing($model_table_name);
            unset($table_columns['updated_at']);
            $view_folder = base_path('resources/js/Pages/'.$model_name);
            $view_index = $view_folder.'/'.$model_name.'Index.jsx';
            $view_form = $view_folder.'/'.$model_name.'Form.jsx';

            $model_controller = base_path('app/Http/Controllers/'.$model_name.'Controller.php');
            $model_request = base_path('app/Http/Requests/'.$model_name.'Request.php');
            $model_resource = base_path('app/Http/Resources/'.$model_name.'Resource.php');

            $crud_frontend_index_stub = base_path('stubs/CRUDFiles/frontend/CRUDIndex.stub');
            $crud_frontend_form_stub = base_path('stubs/CRUDFiles/frontend/CRUDForm.stub');

            $crud_backend_controller_stub = base_path('stubs/CRUDFiles/backend/CRUDController.stub');
            $crud_backend_request_stub = base_path('stubs/CRUDFiles/backend/CRUDRequest.stub');
            $crud_backend_resource_stub = base_path('stubs/CRUDFiles/backend/CRUDResource.stub');

            if (
                ! File::isDirectory($view_folder) &&
                ! File::exists($model_controller) &&
                ! File::exists($model_request) &&
                ! File::exists($model_resource) &&
                ! File::exists($view_index) &&
                ! File::exists($view_form)
            ) {
                $crud_frontend_index_stub_string = File::get($crud_frontend_index_stub);
                $crud_frontend_form_stub_string = File::get($crud_frontend_form_stub);

                $crud_backend_controller_stub_string = File::get($crud_backend_controller_stub);
                $crud_backend_resource_stub_string = File::get($crud_backend_resource_stub);
                $crud_backend_request_stub_string = File::get($crud_backend_request_stub);

                $ignore_columns = ['updated_at', 'id'];
                $datatable_fields = '';
                $model_form = '';
                $model_form_field = '';
                $searches_array = '';
                $resource_array = '';
                $request_array = '';
                foreach ($table_columns as $column) {
                    if (! in_array($column, $ignore_columns)) {
                        if ($has_image) {
                            $datatable_fields .=
                                "
                        {
                            name: translate('".str_replace('_', ' ', ucfirst($column))."'),
                            key: '{$column}',
                            sort: true,{{}}
                        },";
                            if ($column == 'created_at') {
                                $datatable_fields = str_replace('{{}}',
                                    "data_type: 'date',
                            format: 'YYYY-MM-DD hh:mm A'",
                                    $datatable_fields
                                );
                            } else {
                                $datatable_fields = str_replace('{{}}', '', $datatable_fields);
                            }
                        } else {
                            if ($column != 'image') {
                                $datatable_fields .=
                                    "
                        {
                            name: translate('".str_replace('_', ' ', ucfirst($column))."'),
                            key: '{$column}',
                            sort: true,{{}}
                        },";
                                if ($column == 'created_at') {
                                    $datatable_fields = str_replace('{{}}',
                                        "data_type: 'date',
                            format: 'YYYY-MM-DD hh:mm A'",
                                        $datatable_fields
                                    );
                                } else {
                                    $datatable_fields = str_replace('{{}}', '', $datatable_fields);
                                }
                            }
                        }
                    }
                    if (! in_array($column, ['id', 'created_at', 'updated_at', 'image', 'photo', 'picture'])) {
                        $model_form .= "
                        <TextField
                            onChange={handleChange}
                            value={data.{$column}}
                            error={errors.{$column}}
                            helperText={errors.{$column}}
                            name={'{$column}'}
                            size={'small'}
                            label={translate('".ucfirst($column)."')}
                            required={true}
                        />";
                    }
                    if (! in_array($column, ['id', 'created_at', 'updated_at'])) {
                        $model_form_field .= '
        '.$column.': '.strtolower($model_name)."?.{$column},";
                        $searches_array .= "'{$column}', ";
                        if ($column == 'image' && $has_image) {
                            $request_array = "
            '{$column}' => ['required', 'file', 'image', 'max:5000'],";
                        } else {
                            $request_array .= "
            '${column}' => ['required', 'string', 'min:1', 'max:150'],";
                        }
                    }
                    if ($has_image) {
                        if ($column == 'id') {
                            $resource_array = "
            'id' => encrypt(\$this->id),";
                        } else {
                            $resource_array .= "
            '{$column}' => \$this->{$column},";
                        }
                    } else {
                        if ($column != 'image') {
                            if ($column == 'id') {
                                $resource_array = "
            'id' => encrypt(\$this->id),";
                            } else {
                                $resource_array .= "
            '{$column}' => \$this->{$column},";
                            }
                        }
                    }
                }
                $searches = [
                    '{{ModelClassName}}',
                    '{{modal_small_name}}',
                    '{{model_fields}}',
                    '{{model_form_field}}',
                    '{{model_form_inputs}}',
                    '{{search_array}}',
                    '{{resource_array}}',
                    '{{request_array}}',
                    '/**** Other routes ****/',
                    '{/*Other links*/}',
                ];
                $replaces = [
                    $model_name,
                    strtolower($model_name),
                    $datatable_fields,
                    $model_form_field,
                    $model_form,
                    $searches_array,
                    $resource_array,
                    $request_array,
                    "
            /***************************** {$model_name} Routes ****************************/
            Route::resource('".strtolower($model_name)."', \App\Http\Controllers\\".$model_name.'Controller::class);

            /**** Other routes ****/',
                    "
            <ProtectedComponent role={'".strtolower($model_name)."-access'}>
                <SidebarLinkButton
                    dir={dir}
                    icon={<InsertEmoticonIcon className={'h-5'} />}
                    url={route('".strtolower($model_name).".index', { lang })}
                    label={translate('".$model_name."')}
                    active={active === '".strtolower($model_name)."'}
                />
            </ProtectedComponent>
            {/*Other links*/}
                    ",
                ];

                $crud_frontend_index_stub_string = str_replace(
                    $searches,
                    $replaces,
                    $crud_frontend_index_stub_string,
                );
                $crud_frontend_form_stub_string = str_replace(
                    $searches,
                    $replaces,
                    $crud_frontend_form_stub_string,
                );

                $crud_backend_controller_stub_string = str_replace(
                    $searches,
                    $replaces,
                    $crud_backend_controller_stub_string,
                );

                $crud_backend_resource_stub_string = str_replace(
                    $searches,
                    $replaces,
                    $crud_backend_resource_stub_string,
                );

                $crud_backend_request_stub_string = str_replace(
                    $searches,
                    $replaces,
                    $crud_backend_request_stub_string,
                );

                $web_routes_file_string = str_replace(
                    $searches,
                    $replaces,
                    $web_routes_file_string,
                );

                $sidebar_links_string = str_replace(
                    $searches,
                    $replaces,
                    $sidebar_links_string,
                );

                File::makeDirectory($view_folder);
                File::put($view_index, $crud_frontend_index_stub_string);
                File::put($view_form, $crud_frontend_form_stub_string);
                File::put($model_controller, $crud_backend_controller_stub_string);
                File::put($model_resource, $crud_backend_resource_stub_string);
                File::put($model_request, $crud_backend_request_stub_string);
                File::put($web_routes_file, $web_routes_file_string);
                File::put($sidebar_links, $sidebar_links_string);

                $sort = PermissionGroup::query()->where('permission_group_id', 0)->max('sort') + 1;

                $permissionGroup = PermissionGroup::query()->create([
                    'name' => $model_name,
                    'permission_group_id' => 0,
                    'sort' => $sort,
                ]);

                Permission::query()->create([
                    'permission_group_id' => $permissionGroup->id,
                    'name' => 'Access',
                    'key' => Str::slug('Access'),
                ]);
                Permission::query()->create([
                    'permission_group_id' => $permissionGroup->id,
                    'name' => 'Create '.$model_name,
                    'key' => Str::slug('Create '.$model_name),
                ]);
                Permission::query()->create([
                    'permission_group_id' => $permissionGroup->id,
                    'name' => 'Edit '.$model_name,
                    'key' => Str::slug('Edit '.$model_name),
                ]);
                Permission::query()->create([
                    'permission_group_id' => $permissionGroup->id,
                    'name' => 'Delete '.$model_name,
                    'key' => Str::slug('Delete '.$model_name),
                ]);

                $this->info('Crud generated successfully');
            } else {
                File::deleteDirectory($view_folder);
                File::delete($model_controller);
                File::delete($model_request);
                File::delete($model_resource);
                File::delete($view_index);
                File::delete($view_form);
                $permission_group = PermissionGroup::query()->where('name', $model_name)->where('permission_group_id', 0)->first();
                if($permission_group){
                    Permission::query()->where('permission_group_id', $permission_group->id)->delete();
                    $permission_group->delete();
                }

                $this->error('Model exits');
            }
        } else {
            $this->error('File not found');
        }

        return Command::SUCCESS;
    }
}
