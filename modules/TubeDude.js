import Entity from './Entity';
import Link from './Link';
import Body from './Body';
import Shoulders from './Shoulders';
import Tangent from './Tangent';
import Arms from './Arms';
import Eyes from './Eyes';

import { getRandomInt, getRandomFloat } from '../utils';
import Mouth from './Mouth';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// TubeDude
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class TubeDude extends Entity {
    constructor({ position, width, height, color }) {
        super();
        this.position = position;
        this.height = height;
        this.width = width;
        this.color = color;
        this.resolution = this.toValue(window.innerHeight / 30);
        this.buildBody();
    }

    buildBody() {
        const { color, width, height, position, resolution } = this;
        const pointAmt = Math.round(this.height / this.resolution);

        this.body = new Body({
            color,
            width,
            height,
            position,
            resolution,
        });

        this.arms = new Arms({
            p1: this.body.spine[Math.round(pointAmt * 0.6)],
            p2: this.body.spine[Math.round(pointAmt * 0.6) + 1],
            shoulderWidth: width / 1.3,
            length: height * 0.4,
            width: width / 4,
            resolution,
            color,
        });

        this.eyes = new Eyes({
            p1: this.body.spine[Math.round(pointAmt * 0.8)],
            p2: this.body.spine[Math.round(pointAmt * 0.8) + 1],
            color,
            size: width / 3.5,
            width: width / 2,
        });

        this.mouth = new Mouth({
            p1: this.body.spine[Math.round(pointAmt * 0.8)],
            p2: this.body.spine[Math.round(pointAmt * 0.8) - 1],
            size: width / 3.5,
            lipColor: '#d16060',
            lipWidth: width / 15,
        });
    }

    draw = ({ ctx, bounds }) => {
        this.body.draw({ ctx });
        this.eyes.draw({ ctx });
        this.mouth.draw({ ctx });
        this.arms.draw({ ctx });
    };

    update = context => {
        this.body.update(context);
        this.arms.update(context);
        this.mouth.update(context);
        this.eyes.update();
    };
}

export default TubeDude;

// ctx.shadowColor = '#252f3d';
// ctx.shadowBlur = 0;
// ctx.shadowOffsetX = 15;
// ctx.shadowOffsetY = 15;
// ctx.shadowColor = 'transparent';
