import Box from "./objects/Box.js";
import Vec from "./Vec.js";

export default class Map {

    static async loadMapFile(path, level) {
        return fetch(path).then(res => res.text()).then(txt => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(txt, "text/xml");
            const svg = xmlDoc.rootElement;
            svg.style.transform = "scale(1, -1)";

            const recs = xmlDoc.querySelectorAll('rect');

            document.body.appendChild(svg);
            
            for(let rec of [...recs].slice(0)) {
                const bounds = rec.getClientRects()[0];
                if(bounds && bounds.width < 1920) {
                    const v = (1920/2) + 200;
                    const wall = new Box(bounds.x, bounds.y - v, bounds.width, bounds.height);

                    level.add(wall);
                }
            }

            document.body.removeChild(svg);
        })
    }

}