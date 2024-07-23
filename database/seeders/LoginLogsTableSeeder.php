<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LoginLogsTableSeeder extends Seeder
{
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        \DB::table('login_logs')->delete();

        \DB::table('login_logs')->insert([
            0 => [
                'id' => 1,
                'email' => 'edris.malya@dab.gov.af',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 1,
                'created_at' => '2022-12-20 15:32:24',
                'updated_at' => '2022-12-20 15:32:24',
            ],
            1 => [
                'id' => 2,
                'email' => 'adrismalya@gmail.com',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 0,
                'created_at' => '2022-12-20 15:45:40',
                'updated_at' => '2022-12-20 15:45:40',
            ],
            2 => [
                'id' => 3,
                'email' => 'adrismalya@gmail.com',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 0,
                'created_at' => '2022-12-20 15:45:41',
                'updated_at' => '2022-12-20 15:45:41',
            ],
            3 => [
                'id' => 4,
                'email' => 'adrismalya@gmail.com',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 0,
                'created_at' => '2022-12-20 15:45:42',
                'updated_at' => '2022-12-20 15:45:42',
            ],
            4 => [
                'id' => 5,
                'email' => 'adrismalya@gmail.com',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 0,
                'created_at' => '2022-12-20 15:45:43',
                'updated_at' => '2022-12-20 15:45:43',
            ],
            5 => [
                'id' => 6,
                'email' => 'adrismalya@gmail.com',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 0,
                'created_at' => '2022-12-20 15:45:45',
                'updated_at' => '2022-12-20 15:45:45',
            ],
            6 => [
                'id' => 7,
                'email' => 'adrismalya@gmail.com',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 0,
                'created_at' => '2022-12-21 08:59:05',
                'updated_at' => '2022-12-21 08:59:05',
            ],
            7 => [
                'id' => 8,
                'email' => 'adrismalya@gmail.com',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 0,
                'created_at' => '2022-12-21 08:59:06',
                'updated_at' => '2022-12-21 08:59:06',
            ],
            8 => [
                'id' => 9,
                'email' => 'adrismalya@gmail.com',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 1,
                'created_at' => '2022-12-21 08:59:11',
                'updated_at' => '2022-12-21 08:59:11',
            ],
            9 => [
                'id' => 10,
                'email' => 'edris.malya@dab.gov.af',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 1,
                'created_at' => '2022-12-21 12:30:24',
                'updated_at' => '2022-12-21 12:30:24',
            ],
            10 => [
                'id' => 11,
                'email' => 'edris.malya@dab.gov.af',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 1,
                'created_at' => '2022-12-21 12:30:52',
                'updated_at' => '2022-12-21 12:30:52',
            ],
            11 => [
                'id' => 12,
                'email' => 'adrismalya@gmail.com',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 0,
                'created_at' => '2022-12-21 12:31:01',
                'updated_at' => '2022-12-21 12:31:01',
            ],
            12 => [
                'id' => 13,
                'email' => 'adrismalya@gmail.com',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 1,
                'created_at' => '2022-12-21 12:31:05',
                'updated_at' => '2022-12-21 12:31:05',
            ],
            13 => [
                'id' => 14,
                'email' => 'adrismalya@gmail.com',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 1,
                'created_at' => '2022-12-22 08:48:48',
                'updated_at' => '2022-12-22 08:48:48',
            ],
            14 => [
                'id' => 15,
                'email' => 'edris.malya@dab.gov.af',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 1,
                'created_at' => '2022-12-22 10:16:37',
                'updated_at' => '2022-12-22 10:16:37',
            ],
            15 => [
                'id' => 16,
                'email' => 'adrismalya@gmail.com',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 1,
                'created_at' => '2022-12-22 10:29:39',
                'updated_at' => '2022-12-22 10:29:39',
            ],
            16 => [
                'id' => 17,
                'email' => 'edris.malya@dab.gov.af',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 1,
                'created_at' => '2022-12-22 10:29:52',
                'updated_at' => '2022-12-22 10:29:52',
            ],
            17 => [
                'id' => 18,
                'email' => 'edrismalya2@gmail.com',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 0,
                'created_at' => '2022-12-24 09:09:46',
                'updated_at' => '2022-12-24 09:09:46',
            ],
            18 => [
                'id' => 19,
                'email' => 'edris.malya@dab.gov.af',
                'ip_address' => '127.0.0.1',
                'action_type' => 'login',
                'status' => 1,
                'created_at' => '2022-12-24 09:09:53',
                'updated_at' => '2022-12-24 09:09:53',
            ],
        ]);
    }
}
