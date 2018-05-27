const config = {
    fill: true,
    lineTension: 0.1,
};

export const buildLineChartData = projects => {
    const data = {
        labels: [],
        datasets: []
    };

    // Get all devices of all projects
    const devices = [];
    projects.forEach((project, index) => {
        project.devices.forEach(device => {
            if (-1 === devices.indexOf(device.name)) {
                devices.push(device.name);
            }
        });
    });

    data.labels = devices;
    
    projects.forEach((project, index) => {
        data.datasets[index] = {
            label: project.name,
            ...config,
            data: []
        };

        devices.forEach(device => {
            data.datasets[index].data.push(null);
        });

        project.devices.forEach(device => {
            const indexOfValue = devices.indexOf(device.name);
            data.datasets[index].data[indexOfValue] = parseFloat(device.complete);
        });
    });

    return data;
};
