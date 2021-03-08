const pois = [
  { poi_id: 1, name: 'EQ Works', lat: 43.6708, lon: -79.3899 },
  { poi_id: 2, name: 'CN Tower', lat: 43.6426, lon: -79.3871 },
  { poi_id: 3, name: 'Niagara Falls', lat: 43.0896, lon: -79.0849 },
  { poi_id: 4, name: 'Vancouver Harbour', lat: 49.2965, lon: -123.0884 },
];
const sHourlies = [
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 0,
    impressions: 10746,
    clicks: 23,
    revenue: '64.9215630000000',
    poi_id: 3,
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 1,
    impressions: 141397,
    clicks: 201,
    revenue: '696.4485960000000',
    poi_id: 4,
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 2,
    impressions: 137464,
    clicks: 217,
    revenue: '732.0955030000000',
    poi_id: 1,
  },
];
//

var array = [
  {
    name: 'foo1',
    value: 'val1',
  },
  {
    name: 'foo1',
    value: ['val2', 'val3'],
  },
  {
    name: 'foo2',
    value: 'val4',
  },
];

var output = [
  {
    name: 'foo1',
    value: ['val1', 'val2', 'val3'],
  },
  {
    name: 'foo2',
    value: ['val4'],
  },
  {
    name: 'foo5',
    value: ['val4'],
  },
];

function combineFn(arr1, arr2, agr) {
  let newArr1 = [...arr1];
  let newArr2 = [...arr2];

  for (let i = 0; i < newArr1.length; i++) {
    for (let j = 0; j < newArr2.length; j++) {
      if (newArr1[i][agr] === newArr2[j][agr]) {
        newArr1[i] = {
          ...newArr1[i],
          ...newArr2[j],
        };
      }
    }
  }
  return newArr1;
}

const combineArr = combineFn(pois, sHourlies, 'poi_id');
console.log('🚀 ~ file: test.js ~ line 83 ~ combineArr', combineArr);
