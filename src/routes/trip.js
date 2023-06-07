export class Trip {
    constructor(fileData) {
        const lines = fileData.split("\n").map(x => x.trim());

        this.dayData = [];
        let currDayData = [];

        let i = 0;
        let townCount = 0;
        while (i < lines.length) {
            if (lines[i] == "---") {
                this.dayData.push(currDayData);
                currDayData = [];
                i++;
                continue;
            }
            if (lines[i].startsWith("!")) {
                currDayData.push({
                    townVisit: lines[i].substring(1),
                    townNum: ++townCount,
                    townVisitTime: -1
                });
                i++;
                continue;
            }

            const depLine = lines[i];
            const travelLine = lines[i + 1];
            const arrLine = lines[i + 2];
            const [depTime, depLoc] = depLine.split('|').map(x => x.trim());
            const [travelType, vehicleName, dir] = travelLine.split('|').map(x => x.trim());
            const [arrTime, arrLoc] = arrLine.split('|').map(x => x.trim());
            
            const [arrH, arrM] = arrTime.split(":").map(Number);
            const [depH, depM] = depTime.split(":").map(Number);
            let durationMin = (arrH * 60 + arrM) - (depH * 60 + depM);

            currDayData.push({
                depTime,
                depLoc,
                travelType,
                vehicleName,
                dir,
                arrTime,
                arrLoc,
                durationMin
            });

            i += 3;
        }

        for (const day of this.dayData) {
            for (let i = 1; i < day.length - 1; i++) {
                if (day[i].townVisit) {
                    let prevTime = day[i - 1].arrTime;
                    let nextTime = day[i + 1].depTime;
                    let [prev_h, prev_m] = prevTime.split(":").map(Number);
                    let [next_h, next_m] = nextTime.split(":").map(Number);
                    day[i].townVisitTime = (next_h * 60 + next_m) - (prev_h * 60 + prev_m);
                }
            }
        }
    }
};
