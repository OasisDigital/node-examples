export class ChatConnection<T> {
  es: EventSource;

  constructor(sseUrl: string, dataArrived: (data: T) => void) {
    this.es = new EventSource(sseUrl);
    this.es.onmessage = (evt) => {
      const data = JSON.parse(evt.data); // TODO handle parse error
      dataArrived(data);
    };
  }

  disconnect() {
    this.es.close();
  }
}
