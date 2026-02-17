import { BaseRecognizer } from '../src/BaseRecognizer';

// Mock ImageData
class MockImageData {
  data: Uint8ClampedArray;
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.data = new Uint8ClampedArray(width * height * 4);
  }
}

// Mock Canvas and Context
const createMockCanvas = (width: number, height: number) => {
  const ctx = {
    fillStyle: '',
    fillRect: jest.fn(),
    drawImage: jest.fn(),
    getImageData: jest.fn((x: number, y: number, w: number, h: number) => new MockImageData(w, h)),
  };
  return {
    width,
    height,
    getContext: jest.fn(() => ctx),
  };
};

// 全局 Mock
(globalThis as any).ImageData = MockImageData;
(globalThis as any).document = {
  createElement: jest.fn((type: string) => {
    if (type === 'canvas') return createMockCanvas(128, 48);
    return {};
  }),
};

class TestRecognizer extends BaseRecognizer {
  public async init(modelPath: string) {
    // 模拟初始化
  }
  public async testLoadDict(content: string) {
    return this.loadDictFromContent(content, 'test.txt');
  }
  public testGetPreprocessingCanvas(canvas: any) {
    return this.getPreprocessingCanvas(canvas);
  }
  public testPostProcess(output: Float32Array, dims: number[]) {
    return this.postProcess(output, dims);
  }
  public getDict() {
    return this.dictionary;
  }
}

describe('BaseRecognizer', () => {
  let recognizer: TestRecognizer;

  beforeEach(() => {
    recognizer = new TestRecognizer({ dictPath: '', topK: 5 });
  });

  test('should load dictionary correctly', async () => {
    const dictContent = 'A\nB\nC';
    await recognizer.testLoadDict(dictContent);
    const dict = recognizer.getDict();
    expect(dict).toEqual(['', 'A', 'B', 'C']);
  });

  test('should handle postProcess correctly', async () => {
    await recognizer.testLoadDict('A\nB\nC');
    const dims = [1, 2, 4];
    const output = new Float32Array([
      0.1, 0.8, 0.05, 0.05,
      0.05, 0.1, 0.8, 0.05
    ]);

    const result = recognizer.testPostProcess(output, dims);
    expect(result.candidates.length).toBeGreaterThan(0);
    expect(result.candidates[0]?.character).toBe('B'); 
  });

  test('should trigger preprocessing flow', () => {
    const mockCanvas = createMockCanvas(100, 100);
    const { data } = recognizer.testGetPreprocessingCanvas(mockCanvas as any);
    expect(data).toBeInstanceOf(Float32Array);
    expect(data.length).toBe(1 * 3 * 48 * 128);
    expect(mockCanvas.getContext).toHaveBeenCalled();
  });
});
