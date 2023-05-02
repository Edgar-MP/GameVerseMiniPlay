import { doc, collection, setDoc } from 'firebase/firestore/lite'
import { defineStore } from "pinia";
import { db } from '../firebaseConfig'
/*
genres
0 → RPG
1 → Hack & Slash
2 → Adventure
3 → Strategy
4 → Card & Board Game
5 → Simulator
6 → Indie
7 → Music
8 → Plataform
9 → Arcade
10 → Point & Click
11 → Puzzle
12 → Shooter

plataforms
0 → PC (Windows)
1 → PS1
2 → PS2
3 → PS3
4 → PS4
5 → PS5
6 → Android
7 → iOS
8 → Switch
9 → Mac
10 → Xbox One
11 → Xbox Series X|S
12 → Linux


*/

export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents: []
    }),
    actions: {
        async getUrls() {
            const docRef = await setDoc(doc(db, "guessTheCover", ""), {
                name: "",
                year: "",
                plataforms: [
                    0,
                    4,
                    5,
                    8,
                    10,
                    11
                ],
                genres: [
                    8,
                    2,
                    11
                ]
              });
          }
    }
})

/*
td1t8kb33gyo8mvhl2pc → Tunic
E9SvTGAcScOZi6BwXxEw → Ghost of Tsushima
co1sh7 → Nioh 2
co2dwe → Marvel's Spider-Man: Miles Morales
co2pow → Potion Craft
co3wls → Animal Crossing: New Horizons
co480t → Genshin Impact
co4kl4 → The Quarry
co4ocq → Xenoblade Chronicles 3
co4tt2 → Stray
co4v1e → Pentiment
co6219 → Teenage Mutant Ninja Turtles: Shredder's Revenge
co55md → Cult of the Lamb
co5bcn → Not For Broadcast
co5d1l → Grounded
co6219 → Hi-Fi Rush
sSrQ2OSaZTBb45aF0tNr → Marvel Snap
co4nzt → DEATHLOOP
co3p5n → DOOM Eternal
co1p7d → Little Nightmares II




*/
