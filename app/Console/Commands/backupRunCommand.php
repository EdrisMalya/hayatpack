<?php

namespace App\Console\Commands;

use App\Events\BackupFinishedEvent;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class backupRunCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'backup:run2';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Artisan::call('backup:run');
        event(new BackupFinishedEvent('backup finished'));

        return Command::SUCCESS;
    }
}
