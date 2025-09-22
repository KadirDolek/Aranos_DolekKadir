<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Blog;

class BlogSeeder extends Seeder
{
    public function run()
    {
        $blog1 = Blog::create([
            'title' => 'Les meilleures destinations de voyage 2024',
            'description' => 'Découvrez les destinations les plus prisées pour vos voyages en 2024.',
            'image' => 'travel_destinations.jpg',
            'user_id' => 3, // Rédacteur
            'category_id' => 1 // Travel
        ]);
        $blog1->tags()->attach([1, 9, 12]); // Lifestyle, News, World

        $blog2 = Blog::create([
            'title' => 'Conseils pour une santé optimale',
            'description' => 'Des astuces simples pour améliorer votre santé au quotidien.',
            'image' => 'health_tips.jpg',
            'user_id' => 3, // Rédacteur
            'category_id' => 2 // Health Care
        ]);
        $blog2->tags()->attach([1, 4, 13]); // Lifestyle, Food, Hobbies

        $blog3 = Blog::create([
            'title' => 'Découvertes scientifiques récentes',
            'description' => 'Les dernières avancées scientifiques qui vont changer notre monde.',
            'image' => 'scientific_discoveries.jpg',
            'user_id' => 2, // Webmaster
            'category_id' => 3 // Discover
        ]);
        $blog3->tags()->attach([3, 9, 11]); // Technologie, News, Science

        $blog4 = Blog::create([
            'title' => 'Tendances mode printemps-été 2024',
            'description' => 'Les must-have de la saison pour être à la pointe de la mode.',
            'image' => 'fashion_trends.jpg',
            'user_id' => 3, // Rédacteur
            'category_id' => 4 // Fashion
        ]);
        $blog4->tags()->attach([1, 8, 9]); // Lifestyle, Cinema, News

        $blog5 = Blog::create([
            'title' => 'Stratégies pour développer votre entreprise',
            'description' => 'Des méthodes éprouvées pour faire croître votre business.',
            'image' => 'business_strategies.jpg',
            'user_id' => 1, // Admin
            'category_id' => 5 // Business
        ]);
        $blog5->tags()->attach([7, 9, 10]); // Education, News, Politics

        $blog6 = Blog::create([
            'title' => 'Guide du voyageur responsable',
            'description' => 'Comment voyager tout en respectant l\'environnement et les cultures locales.',
            'image' => 'responsible_travel.jpg',
            'user_id' => 3, // Rédacteur
            'category_id' => 1 // Travel
        ]);
        $blog6->tags()->attach([1, 6, 12]); // Lifestyle, Religion, World

        $blog7 = Blog::create([
            'title' => 'Recettes healthy faciles et rapides',
            'description' => 'Des recettes délicieuses et saines pour le quotidien.',
            'image' => 'healthy_recipes.jpg',
            'user_id' => 3, // Rédacteur
            'category_id' => 2 // Health Care
        ]);
        $blog7->tags()->attach([4, 5, 13]); // Food, Recipes, Hobbies

        $blog8 = Blog::create([
            'title' => 'Impact de la technologie sur l\'éducation',
            'description' => 'Comment les nouvelles technologies transforment l\'apprentissage.',
            'image' => 'tech_education.jpg',
            'user_id' => 2, // Webmaster
            'category_id' => 3 // Discover
        ]);
        $blog8->tags()->attach([3, 7, 11]); // Technologie, Education, Science
    }
}