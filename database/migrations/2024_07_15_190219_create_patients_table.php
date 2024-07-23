<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('bed_id');
            $table->string('id_number');
            $table->string('image');
            $table->string('full_name');
            $table->string('father_name');
            $table->string('grant_father_name');
            $table->string('nid');
            $table->string('dob');
            $table->string('gender');
            $table->integer('age');
            $table->string('current_address');
            $table->string('permanent_address');
            $table->string('martial_status');
            $table->string('entry_date');
            $table->string('r_full_name');
            $table->string('r_father_name');
            $table->string('r_grant_father_name');
            $table->string('r_nid');
            $table->string('r_phone_number');
            $table->string('relationship');
            $table->string('r_current_address');
            $table->string('r_permanent_address');
            $table->string('illness_duration');
            $table->string('mental_state');
            $table->unsignedInteger('period_id');
            $table->double('per_day_fees');
            $table->double('total_period_price')->nullable();
            $table->string('amount_by_alphabet');
            $table->string('taken_items');
            $table->string('take_item_date');
            $table->string('take_item_person');
            $table->double('due_amount')->default(0);
            $table->boolean('exited')->default(0);
            $table->boolean('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patients');
    }
};
