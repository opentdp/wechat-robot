import * as gemini from './model/gemini.js';

export default function (type) {

    switch (type) {
        case 'gemini':
            gemini.preload();
            return gemini;
    }

}
