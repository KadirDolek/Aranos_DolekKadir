<?php

namespace Database\Seeders;

use App\Models\Commentaire;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Commentaire::insert([
            [
                'message' => 'test1',
                'user_id' => 1,
                'blog_id' => 1
            ],
            [
                'message' => 'test2 ',
                'user_id' => 1,
                'blog_id' => 2
            ],
            [
                'message' => 'Lorem blablabla ',
                'user_id' => 1,
                'blog_id' => 3
            ],
            [
                'message' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex accusantium officia dolorum mollitia quas vitae suscipit, quae minus dolorem animi nobis, voluptas nesciunt! Ab ad iure exercitationem. Magnam, alias ducimus.',
                'user_id' => 1,
                'blog_id' => 4
            ],
            [
                'message' => 'dfksdhfidshsidhfds ',
                'user_id' => 1,
                'blog_id' => 5
            ],
            
        ]);
    }
}
