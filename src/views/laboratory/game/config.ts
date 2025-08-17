export const configOpt = {
  defaultSize: 30,
  width: 600,
  height: 540,
  colors: ['#ccc', 'blueviolet', 'turquoise', 'antiquewhite', 'burlywood', 'chartreuse'],

  components: [
    {
      title: '田',
      items: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
      ],
      index: 0,
      childs: [
        {
          title: 'rotate(0)',
          items: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 }
          ]
        },
        {
          title: 'rotate(90)',
          items: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 }
          ]
        },
        {
          title: 'rotate(180)',
          items: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 }
          ]
        },
        {
          title: 'rotate(270)',
          items: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 }
          ]
        }
      ],
      width: 2,
      height: 2,
      left: 0,
      top: 0
    },
    {
      title: '7',
      items: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 }
      ],
      index: 0,
      childs: [
        {
          title: 'rotate(0)',
          items: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 1, y: 2 }
          ]
        },
        {
          title: 'rotate(90)',
          items: [
            { x: 2, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
          ]
        },
        {
          title: 'rotate(180)',
          items: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 2 }
          ]
        },
        {
          title: 'rotate(270)',
          items: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 0, y: 1 }
          ]
        }
      ],
      width: 2,
      height: 3
    },
    {
      title: '1',
      items: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 3 }
      ],
      index: 0,
      childs: [
        {
          title: 'rotate(0)',
          items: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 }
          ]
        },
        {
          title: 'rotate(90)',
          items: [
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 }
          ]
        },
        {
          title: 'rotate(180)',
          items: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 },
            { x: 0, y: 3 }
          ]
        },
        {
          title: 'rotate(270)',
          items: [
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 }
          ]
        }
      ],
      width: 1,
      height: 4
    },
    {
      title: '反7',
      items: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 }
      ],
      index: 0,
      childs: [
        {
          title: 'rotate(0)',
          items: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 0, y: 2 }
          ]
        },
        {
          title: 'rotate(90)',
          items: [
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 }
          ]
        },
        {
          title: 'rotate(180)',
          items: [
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 0, y: 2 },
            { x: 1, y: 2 }
          ]
        },
        {
          title: 'rotate(270)',
          items: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
          ]
        }
      ],
      width: 2,
      height: 3
    },
    {
      title: '丁',
      items: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 1, y: 1 }
      ],
      index: 0,
      childs: [
        {
          title: 'rotate(0)',
          items: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 1 }
          ]
        },
        {
          title: 'rotate(90)',
          items: [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 2 }
          ]
        },
        {
          title: 'rotate(180)',
          items: [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
          ]
        },
        {
          title: 'rotate(270)',
          items: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 0, y: 2 }
          ]
        }
      ],
      width: 3,
      height: 2
    },
    {
      title: 'z',
      items: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 1 }
      ],
      childs: [
        {
          title: 'rotate(0)',
          items: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
          ]
        },
        {
          title: 'rotate(90)',
          items: [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 0, y: 2 }
          ]
        },
        {
          title: 'rotate(180)',
          items: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: 1 },
            { x: 2, y: 1 }
          ]
        },
        {
          title: 'rotate(270)',
          items: [
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 0, y: 2 }
          ]
        }
      ],
      index: 0,
      width: 3,
      height: 2
    },
    {
      title: '反z',
      items: [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
      ],
      childs: [
        {
          title: 'rotate(0)',
          items: [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 }
          ]
        },
        {
          title: 'rotate(90)',
          items: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 2 }
          ]
        },
        {
          title: 'rotate(180)',
          items: [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 }
          ]
        },
        {
          title: 'rotate(270)',
          items: [
            { x: 0, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 1, y: 2 }
          ]
        }
      ],
      index: 0,
      width: 3,
      height: 2
    }
  ],
  workComponent: {
    color: '#ccc',
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    items: [],
    index: 0,
    childs: []
  },
  points: []
}

export type ConfigOptType = typeof configOpt
