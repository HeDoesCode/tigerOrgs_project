<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Mitie\NER;
use Smalot\PdfParser\Parser;
use NlpTools\Tokenizers\WhitespaceTokenizer;
use NlpTools\Utils\StopWords as RemoveStopWords;
use writecrow\Lemmatizer\Lemmatizer;
use voku\helper\StopWords as GetStopWords;

class DataExtractionTools extends Model
{
    use HasFactory;

    private static $data;

    public static function parseFile($file) 
    {
        $parser = new Parser();

        return $parser->parseFile($file)->getText();
    } 

    public static function parseInput($input)
    {
        static::$data = $input;

        return new static;
    }

    public static function tokenize() 
    {
        $tokenizer = new WhitespaceTokenizer();
        static::$data = $tokenizer->tokenize(static::$data);
        return new static;
    }

    public static function lemmatize() 
    {
        $lemmas = [];

        foreach (static::$data as $token) {
            $lemmas[] = Lemmatizer::getLemma($token);
        }
        
        static::$data = $lemmas;

        return new static;
    }

    public static function removeStopWords()
    {
        $stopWords = new GetStopWords();
        $removeStopWords = new RemoveStopWords($stopWords->getStopWordsAll()['en']);
        
        $cleanedData = [];

        foreach (static::$data as $token) {
            $cleanedData[] = $removeStopWords->transform($token);        
        }
        
        static::$data = array_filter($cleanedData);
        return new static;
    }

    public static function removeSpecialChar()
    {
        $pattern = "/[^.A-Za-z0-9\@\-\/\:]/";

        $preparedData = [];

        foreach (static::$data as $token) {
            $preparedData[] = preg_replace($pattern, "", $token);
        }

        static::$data = array_filter($preparedData);
        return new static;
    }

    public static function NER()
    {
        // dd(Storage::disk()->path("MITIE-models/english/caTIGERizer_model.dat"));
        $NER_MODEL = new NER(Storage::disk()->path("MITIE-models/english/caTIGERizer_model.dat"));  
        
        $classifiedData = [];

        foreach (static::$data as $token) {
            $classifiedData[] = $NER_MODEL->entities($token);
        }
        
        return $classifiedData;
    }

}