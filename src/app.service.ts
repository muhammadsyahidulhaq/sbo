import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // Fungsi sederhana untuk diuji
  add(a: number, b: number): number {
    return a + b;
  }
  multiply(a: number, b: number): number {
  return a * b;
}
// tambahkan di app.service.spec.ts
it('harus mengalikan dua angka dengan benar', () => {
  expect(service.multiply(3, 4)).toBe(12);
});

}
