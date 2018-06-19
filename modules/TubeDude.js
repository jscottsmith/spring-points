import Arms from './Arms';
import Body from './Body';
import Entity from './Entity';
import Eyes from './Eyes';
import Mouth from './Mouth';

import { getRandomInt, getRandomFloat } from '../utils';

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// TubeDude
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

class TubeDude extends Entity {
    constructor({ position, width, height, color, mouthColor, pupilColor }) {
        super();
        this.position = position;
        this.height = height;
        this.width = width;
        this.color = color;
        this.pupilColor = pupilColor;
        this.mouthColor = mouthColor;
        this.resolution = this.toValue(window.innerHeight / 30);
        this.buildBody();
    }

    buildBody() {
        const {
            color,
            width,
            height,
            position,
            resolution,
            mouthColor,
            pupilColor,
        } = this;
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
            shoulderWidth: width / 1.4,
            length: height * 0.4,
            width: width / 4,
            resolution,
            color,
        });

        this.eyes = new Eyes({
            p1: this.body.spine[Math.round(pointAmt * 0.8)],
            p2: this.body.spine[Math.round(pointAmt * 0.8) + 1],
            color,
            pupilColor,
            size: width / 3.5,
            width: width / 2,
        });

        this.mouth = new Mouth({
            p1: this.body.spine[Math.round(pointAmt * 0.8)],
            p2: this.body.spine[Math.round(pointAmt * 0.8) - 1],
            size: width / 3.5,
            lipColor: '#d16060',
            lipWidth: width / 15,
            mouthColor,
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
