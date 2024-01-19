# Starting the development server
### First-time set up
1. Run terminal commands `composer install` and `npm install` in project directory.
2. Make a copy of file `.env.example` named `.env`. Set `.env` values `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD` to appropriate values.
3. Run command `php artisan key:generate`.
4. Run command `php artisan migrate`.

### To start dev server
Run commands `php artisan serve` and `npm run dev` in separate terminals.