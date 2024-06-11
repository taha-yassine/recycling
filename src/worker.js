import { pipeline } from '@xenova/transformers';

class Pipeline {
    static model = 'onnx-community/yolov10n';

    static instance = null;

    constructor(model) {
        this.model = model;
    }

    static getInstance(progressCallback = null) {
        if (this.instance === null) {
            this.instance = pipeline('object-detection', this.model, {progress_callback: progressCallback});
        }

        return this.instance;
    }
}

self.addEventListener('message', async function (event) {
    let generator = await Pipeline.getInstance();

    const image = event.data.data;

    let outputs = await generator(image, {
        threshold: 0.9,
        percentage: true
    })


    self.postMessage({
        type: 'complete',
        target: data.elementIdToUpdate,
        targetType: data.targetType,
        chartId: data.chartId,
        data: outputs
    });
});  