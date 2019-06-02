import { Gamestate } from "./script.js";

game.levels = [[[" ", " ", " ", " ", "w", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", "g", " ", " "],
                [" ", " ", "f", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", "w", " ", "c", " ", " ", " ", " ", " "],
                ["e", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "t"],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", "w", " ", "h", "g", " ", "f", " ", " "],
                [" ", " ", "h", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],],
                
               [[" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", "g", " ", " ", " ", " ", " ", " ", " ", " ", "g", " "],
                [" ", " ", "c", " ", " ", " ", " ", "c", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                ["t", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", "h", "h", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", "h", "h", " ", " ", " ", " ", " "],
                [" ", " ", "c", " ", " ", " ", " ", "c", " ", " ", " ", "e"],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", "g", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],],
                
               [[" ", " ", " ", " ", "f", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", "g", " ", " "],
                [" ", " ", " ", "w", "b", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", "h", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                ["e", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", "w", " ", " ", " ", "h", " ", " ", "g", " "],
                [" ", " ", "h", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", "f", " ", "t"],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", "f", " ", " ", " ", " ", " ", "g", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],],
                
               [[" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", "h", "h", "h", "h", "h", "h", " ", " ", " "],
                ["t", " ", " ", "h", " ", " ", " ", " ", "h", " ", " ", " "],
                [" ", " ", " ", "h", " ", "f", "f", " ", "h", " ", " ", " "],
                [" ", " ", " ", "h", " ", "f", "f", " ", "h", " ", " ", " "],
                [" ", " ", " ", "h", " ", " ", " ", " ", "h", " ", " ", "e"],
                [" ", " ", " ", "h", "h", "h", "h", "h", "h", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],],
                
               [["c", " ", " ", "c", " ", " ", "c", " ", " ", "c", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                ["b", " ", " ", " ", "b", " ", " ", " ", "b", " ", " ", " "],
                ["e", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", "h", "h", "h", "h", "h", " ", "g", " "],
                [" ", " ", " ", " ", "h", "h", "h", "h", "h", "g", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "t"],
                ["b", " ", " ", " ", "b", " ", " ", " ", "b", " ", " ", " "],
                ["c", " ", " ", "c", " ", " ", "c", " ", " ", "c", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],]];