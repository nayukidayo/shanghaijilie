const dianbiao = {
  // REG20020: {
  //   name: 'A相电压',
  //   unit: 'V',
  //   precision: 0.1,
  // },
  // REG20021: {
  //   name: 'B相电压',
  //   unit: 'V',
  //   precision: 0.1,
  // },
  // REG20022: {
  //   name: 'C相电压',
  //   unit: 'V',
  //   precision: 0.1,
  // },
  REG20023: {
    name: 'AB线电压',
    unit: 'V',
    precision: 0.1,
  },
  REG20024: {
    name: 'BC线电压',
    unit: 'V',
    precision: 0.1,
  },
  REG20025: {
    name: 'CA线电压',
    unit: 'V',
    precision: 0.1,
  },
  REG20026: {
    name: 'A相电流',
    unit: 'A',
    precision: 0.1,
  },
  REG20027: {
    name: 'B相电流',
    unit: 'A',
    precision: 0.1,
  },
  REG20028: {
    name: 'C相电流',
    unit: 'A',
    precision: 0.1,
  },
  REG20033: {
    name: '总有功功率',
    unit: 'kW',
    precision: 0.1,
  },
  // REG20034: {
  //   name: '电源频率',
  //   unit: 'Hz',
  //   precision: 0.01,
  // },
  REG20036: {
    name: '正向有功电能',
    unit: 'kWh',
    precision: 0.01,
  },
}

const zhendong = {
  REG20130: {
    name: '振动',
    unit: 'g',
    precision: 0.001,
  },
}

const yali = {
  AI1: {
    name: '压力',
    unit: 'kPa',
    precision: 1,
  },
}

const wendu = {
  AI2: {
    name: '温度',
    unit: '℃',
    precision: 1,
  },
}

export default [
  {
    id: '01',
    name: '真空泵数采网关01',
    code: 'SHZKB01',
    thumb: '/gateway.svg',
    clientId: 'shanghaizkb01',
    health: false,
    tags: ['dianbiao', 'zhendong'],
    flags: {
      ...dianbiao,
      ...zhendong,
    },
  },
  {
    id: '02',
    name: '真空泵数采网关02',
    code: 'SHZKB02',
    thumb: '/gateway.svg',
    clientId: 'shanghaizkb02',
    health: false,
    tags: ['dianbiao', 'zhendong', 'wendu', 'yali'],
    flags: {
      ...dianbiao,
      ...zhendong,
      ...wendu,
      ...yali,
    },
  },
  {
    id: '03',
    name: '真空泵数采网关03',
    code: 'SHZKB03',
    thumb: '/gateway.svg',
    clientId: 'shanghaizkb03',
    health: false,
    tags: ['dianbiao', 'zhendong'],
    flags: {
      ...dianbiao,
      ...zhendong,
    },
  },
]
