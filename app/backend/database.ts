import Dexie from "dexie";

class MyAppDatabase extends Dexie {
  record!: Dexie.Table<IRecord, number>;
  activity!: Dexie.Table<IActivity, number>;

  //contacts! : Dexie.Table<Icontac

  constructor() {
    super("MyAppDatabase");
    this.version(1).stores({
      record: "++id, activityId, records, date",
      activity: "++id, parameterCount, metrics",
    });
  }

  addRecord(record: IRecord) {
    this.record.add(record);
  }

  getRecordsFor(start: Date, end: Date) {
    return this.record.where("date").between(start, end, true, true).toArray();
  }
}

export interface IRecord {
  id?: number;
  activityId: number;
  records: number[][];
  date: number;
}

export interface SerializableIRerord {

}


export type Metric = {name: string, metric: string}

export interface IActivity {
  id?: number;
  name: string;
  metrics: Metric[];
}

let db: MyAppDatabase | null = null;

export async function getDb() {
  db ??= new MyAppDatabase();

  if(await db.record.count() === 0) {
    const vals = await db.activity.bulkAdd([
      {
        metrics: [
          {
            name: "count",
            metric: "",
          },
          {
            name: "weight",
            metric: "kg",
          },
        ],
        name: "Hello",
      }
    ], {allKeys: true})

    
    
    db.record.bulkAdd([
      {
      activityId: vals[0],
      date: Date.now(),
      records: [
        [1, 2],
        [1, 2],
        [1, 2],
        [1, 2],
        [1, 2],
        [1, 2],
        [1, 2],
        [1, 2],
      ],
      }
    ])
  }
  return db;
}
