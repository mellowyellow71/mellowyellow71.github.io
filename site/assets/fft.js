/** Unnormalized forward radix-2 Cooley–Tukey FFT of real samples. */
export function fft(samples) {
  const size = samples.length;
  if (size < 2 || !Number.isInteger(Math.log2(size))) {
    throw new RangeError('FFT input length must be a power of two, at least 2.');
  }
  const real = Float64Array.from(samples);
  const imaginary = new Float64Array(size);
  for (let index = 1, reversed = 0; index < size; index++) {
    let bit = size >> 1;
    for (; reversed & bit; bit >>= 1) reversed ^= bit;
    reversed ^= bit;
    if (index < reversed) [real[index], real[reversed]] = [real[reversed], real[index]];
  }
  for (let width = 2; width <= size; width *= 2) {
    const half = width / 2;
    for (let start = 0; start < size; start += width) {
      for (let offset = 0; offset < half; offset++) {
        const angle = -2 * Math.PI * offset / width;
        const cosine = Math.cos(angle);
        const sine = Math.sin(angle);
        const even = start + offset;
        const odd = even + half;
        const rotatedReal = real[odd] * cosine - imaginary[odd] * sine;
        const rotatedImaginary = real[odd] * sine + imaginary[odd] * cosine;
        real[odd] = real[even] - rotatedReal;
        imaginary[odd] = imaginary[even] - rotatedImaginary;
        real[even] += rotatedReal;
        imaginary[even] += rotatedImaginary;
      }
    }
  }
  return { real, imaginary };
}

export function createSignal(harmonics, size = 128) {
  return Float64Array.from({ length: size }, (_, sample) => {
    let value = 0;
    for (let harmonic = 1; harmonic <= harmonics; harmonic++) {
      value += Math.sin(2 * Math.PI * 3 * harmonic * sample / size) / harmonic ** 1.35;
    }
    return value;
  });
}

export function spectrum(samples) {
  const { real, imaginary } = fft(samples);
  return Float64Array.from({ length: samples.length / 2 + 1 }, (_, bin) => {
    const scale = bin === 0 || bin === samples.length / 2 ? 1 : 2;
    return scale * Math.hypot(real[bin], imaginary[bin]) / samples.length;
  });
}
