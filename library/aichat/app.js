import * as gemini from './gemini.js';

export default function (type) {

    switch (type) {
        case 'gemini':
            gemini.preload();
            return gemini;
    }

}
