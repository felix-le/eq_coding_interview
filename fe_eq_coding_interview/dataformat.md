### Input chart:

[link Doc](https://carbon-design-system.github.io/carbon-charts/?path=/story/area--stacked-area-percentage)

```json
{
  "data": [
    {
      "group": "name1",
      "date": "date1",
      "value": number1
    },
    {
      "group": "name1",
      "date": "date2",
      "value": number2
    },
    {
      "group": "name1",
      "date": "date3",
      "value": number3
    },
    {
      "group": "name2",
      "date": "date1",
      "value": number1
    }
  ],
  "options": {
    "axes": {
      "bottom": { "scaleType": "time" },
      "left": { "stacked": true },
      "curve": "curveMonotoneX",
      "height": "100%",
      "title": "Stacked area (time series)"
    },
    "type": "stackedArea"
  }
}
```

### Convert Raw Data:
