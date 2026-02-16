export interface RecognitionCandidate {
  character: string;
  score: number;
}

export interface RecognitionResult {
  candidates: RecognitionCandidate[];
}

export interface RecognizerOptions {
  modelPath?: string;
  dictPath: string;
  topK?: number;
}
