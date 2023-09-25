const titleTextStyle = {
    color: '#7b7d7e',
    fontName: 'OpenSans',
    fontSize: '0.75rem',
    italic: false
}
const textStyle = {color: '#7b7d7e'}
const minorGridLines = {
    count: 4,
    minSpacing: 20,
    color: 'transparent'
}
const gridLines = {
    count: 4,
    minSpacing: 20,
    color: '#d5d5d5'
}

export const areaGraphConfig1Mnths = {
    axisTitlesPosition: 'out',
    responsive: true,
    interpolateNulls: true,
    hAxis: {
        textStyle: textStyle,
        titleTextStyle: titleTextStyle,
        gridlines: 'none',
        lineDashStyle: [4, 4],
        maxAlternation: 4,
        format: 'MMM DD',
        showTextEvery: 2,
        viewWindowMode: 'pretty',
        direction: 1
    },
    vAxis: {
        textStyle:textStyle,
        titleTextStyle: titleTextStyle,
        minValue: 'MYR' + 0,
        maxValue: 'MYR' + 1.5,
        showTextEvery: 3,
        direction: 1,
        minorGridlines: minorGridLines,
        gridlines: gridLines,
        viewWindowMode: 'pretty'
    },
    colors: ['#16c0b7', '#567DCC', '#5CD3CD', '#955CD6', '#D45DBA', '#4FA14F'],
    legend: { position: "none" },
    lineWidth: 2.5
};
export const areaGraphConfig3Mnths = {
    axisTitlesPosition: 'out',
    responsive: true,
    hAxis: {
        textStyle: textStyle,
        titleTextStyle: titleTextStyle,
        gridlines: 'none',
        lineDashStyle: [4, 4],
        maxAlternation: 4,
        format: 'MMM DD',
        showTextEvery: 5,
        viewWindowMode: 'pretty',
        direction: 1
    },
    vAxis: {
        textStyle: textStyle,
        titleTextStyle: titleTextStyle,
        minValue: 'MYR' + 0,
        maxValue: 'MYR' + 1.5,
        showTextEvery: 3,
        direction: 1,
        minorGridlines: minorGridLines,
        gridlines: gridLines,
        viewWindowMode: 'pretty'
    },
    colors: ['#16c0b7', '#567DCC', '#5CD3CD', '#955CD6', '#D45DBA', '#4FA14F'],
    legend: { position: "none" },
    lineWidth: 2.5
};

