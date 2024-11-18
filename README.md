<!-- php artisan serve --host 0.0.0.0

session()->flash('toast', [
'title' => 'oh no',
'description' => 'ang daming bugs pare :(',
'variant' => 'destructive'
]); -->

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Application Screenshots

![Screenshot](pictures/459157014_842040444775458_9006623979984151585_n.jpg?raw=true "Screenshot")
![Screenshot](pictures/458156555_442606012145715_3045795471527554897_n.jpg?raw=true "Screenshot")
![Screenshot](pictures/457625336_1347966519921983_2971242882572005108_n.jpg?raw=true "Screenshot")
![Screenshot](pictures/Screenshot2024-09-15213134.png?raw=true "Screenshot")
![Screenshot](pictures/Screenshot2024-09-15213216.png?raw=true "Screenshot")
![Screenshot](pictures/Screenshot2024-09-16124808.png?raw=true "Screenshot")

## Technology Stack

- Laravel
- ReactJS
- InertiaJS
- TailwindCSS
- shadcn

# Developement Environment Setup (with Docker)

1. Download and install docker with WSL2 Ubuntu
2. Clone the repository

   * Either clone the repository directly inside Ubuntu with Git;
   * or copy the cloned source files and paste inside Ubuntu with file explorer
3. Open WSL Ubuntu. Set pwd to cloned repository root folder.
4. Execute the following commands. Install the dependencies first if not installed.

   1. `composer require laravel/sail --dev`
   2. If docker-compose.yml is already present in the root directory:
      * execute:`./vendor/bin/sail up -d --build`;
      * else:`php artisan sail:install`
   3. `./vendor/bin/sail up` (use -d flag to run in detached mode)
   4. Enter container cli using`./vendor/bin/sail bash`
   5. Sail will now handle your usual php commands.
      * `./vendor/bin/sail artisan serve `
      * `./vendor/bin/sail artisan queue:work `
      * `./vendor/bin/sail bash npm run dev `
5. To make executing sail commands easier, create an alias for `./vendor/bin/sail`.

   * `alias sail='sh $([ -f sail ] && echo sail || echo vendor/bin/sail)'`
   * To use alias, simply state "sail" then the command. For example:`sail up -d`
6. Setup **Supervisor** ([source](https://medium.com/@danielarcher/how-to-use-supervisord-for-your-laravel-application-66015f104703)).

   1. Install **Supervisor**

      * `sudo apt-get install supervisor`
   2. Create a new config file:

      * `sudo nano /etc/supervisor/conf.d/laravel-worker.conf`
   3. Put code inside laravel-worker.conf

      ```
      [program:laravel-worker]
      process_name=%(program_name)s_%(process_num)02d
      command=docker exec [laravel container name] php [path to laravel app container]/artisan queue:work --sleep=3 --tries=3
      autostart=true
      autorestart=true
      user=[user]
      numprocs=1
      redirect_stderr=true
      stdout_logfile=/var/log/laravel-worker.log
      ```
      Replace [] with required text. Samples:

      laravel container name: tigerorgs_project-laravel.test-1; Determine using `sail ps` or `sail ps -a`

      path to laravel app container: /var/www/html
   4. Load and Start **Supervisor**:

      * `sudo supervisorctl reread`
      * `sudo supervisorctl update`
      * `sudo supervisorctl start laravel-worker:*`
   5. Test the supervisor. Open a new WSL Ubuntu terminal and run tinker

      * Dispatch a test job using`App\Jobs\TestJob::dispatch()`. Monitor the jobs table.
