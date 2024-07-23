<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PermissionGroupsTableSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        \DB::table('permission_groups')->delete();

        \DB::table('permission_groups')->insert([
            0 => [
                'id' => 1,
                'permission_group_id' => 0,
                'name' => 'User management',
                'sort' => 0,
                'created_at' => '2022-12-11 06:04:50',
                'updated_at' => '2023-02-12 01:43:47',
            ],
            1 => [
                'id' => 2,
                'permission_group_id' => 1,
                'name' => 'Users',
                'sort' => 0,
                'created_at' => '2022-12-11 06:05:03',
                'updated_at' => '2023-02-11 12:28:14',
            ],
            2 => [
                'id' => 3,
                'permission_group_id' => 1,
                'name' => 'Roles',
                'sort' => 1,
                'created_at' => '2022-12-11 06:05:11',
                'updated_at' => '2022-12-11 06:05:11',
            ],
            3 => [
                'id' => 4,
                'permission_group_id' => 0,
                'name' => 'Configuration',
                'sort' => 1,
                'created_at' => '2022-12-11 10:24:12',
                'updated_at' => '2023-02-12 01:41:11',
            ],
            4 => [
                'id' => 5,
                'permission_group_id' => 4,
                'name' => 'Language',
                'sort' => 0,
                'created_at' => '2022-12-11 10:43:17',
                'updated_at' => '2022-12-11 10:43:17',
            ],
            5 => [
                'id' => 6,
                'permission_group_id' => 5,
                'name' => 'Language dictionary',
                'sort' => 0,
                'created_at' => '2022-12-13 05:27:22',
                'updated_at' => '2022-12-13 05:27:22',
            ],
            6 => [
                'id' => 9,
                'permission_group_id' => 2,
                'name' => 'Log activity',
                'sort' => 0,
                'created_at' => '2022-12-18 10:06:48',
                'updated_at' => '2022-12-18 10:06:48',
            ],
            7 => [
                'id' => 10,
                'permission_group_id' => 1,
                'name' => 'Login log',
                'sort' => 2,
                'created_at' => '2022-12-19 06:28:45',
                'updated_at' => '2023-02-11 12:00:47',
            ],
            8 => [
                'id' => 11,
                'permission_group_id' => 4,
                'name' => 'Backups',
                'sort' => 1,
                'created_at' => '2022-12-19 15:37:06',
                'updated_at' => '2022-12-19 15:37:06',
            ],
            9 => [
                'id' => 13,
                'permission_group_id' => 1,
                'name' => 'Log activity',
                'sort' => 3,
                'created_at' => '2022-12-22 10:29:02',
                'updated_at' => '2023-02-11 12:28:14',
            ],
            10 => [
                'id' => 14,
                'permission_group_id' => 4,
                'name' => 'Public website',
                'sort' => 2,
                'created_at' => '2022-12-26 20:10:54',
                'updated_at' => '2022-12-26 20:10:54',
            ],
            11 => [
                'id' => 15,
                'permission_group_id' => 14,
                'name' => 'Home page',
                'sort' => 0,
                'created_at' => '2022-12-27 17:49:11',
                'updated_at' => '2022-12-27 17:49:11',
            ],
            12 => [
                'id' => 16,
                'permission_group_id' => 14,
                'name' => 'Pages',
                'sort' => 1,
                'created_at' => '2022-12-27 17:49:22',
                'updated_at' => '2022-12-27 17:49:22',
            ],
            13 => [
                'id' => 17,
                'permission_group_id' => 14,
                'name' => 'Widgets',
                'sort' => 2,
                'created_at' => '2022-12-28 20:05:48',
                'updated_at' => '2022-12-28 20:05:48',
            ],
            14 => [
                'id' => 33,
                'permission_group_id' => 6,
                'name' => 'Test1',
                'sort' => 0,
                'created_at' => '2023-02-11 12:33:57',
                'updated_at' => '2023-02-11 12:33:57',
            ],
            15 => [
                'id' => 52,
                'permission_group_id' => 0,
                'name' => 'Contact',
                'sort' => 2,
                'created_at' => '2023-02-12 01:39:58',
                'updated_at' => '2023-02-12 01:43:47',
            ],
        ]);
    }
}
