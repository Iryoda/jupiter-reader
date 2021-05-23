interface ScheduleResponse {
  initTime: string;
  endTime: string;
  classes: Classes[];
}

interface Classes {
  name: string;
  day: number;
}

const readJupiterwebHTMLFile = async (file: any) => {
  const response = await fetch(file);
  const data = await response.text();
  //   console.log(data);
  const docs = new DOMParser().parseFromString(data, "text/html");
  readHTMLDocument(docs);
};

const readHTMLDocument = (docs: HTMLDocument): ScheduleResponse[] => {
  const response: ScheduleResponse[] = [];
  const timeTable = docs.getElementById("tableGradeHoraria");
  const schedule = timeTable?.children[0].children;

  if (schedule) {
    for (let i = 1; i < schedule?.length; i++) {
      const classes: Classes[] = [];
      const initTime =
        schedule[i].children[0].childNodes[0].textContent?.trim();
      const endTime = schedule[i].children[1].childNodes[0].textContent?.trim();

      for (let j = 0; j < 5; j++) {
        const className = schedule[i].children[j + 2].children[0];
        className &&
          classes.push({ name: className.children[0].innerHTML, day: j });
      }

      const readerData = {
        initTime: initTime || "",
        endTime: endTime || "",
        classes: classes,
      };

      readerData && response.push(readerData);
    }
  }
  return response;
};
