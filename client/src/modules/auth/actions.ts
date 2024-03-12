const URL_SERVER = 'http://localhost:2024/auth/'

export default {
  async signup(_context: any, payload: any) {
    console.log('from signup', payload);

    const req = await fetch(`${ URL_SERVER }signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }
}
