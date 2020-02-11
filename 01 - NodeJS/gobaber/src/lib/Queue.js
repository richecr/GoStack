import Bee from 'bee-queue';

import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queus = {};

    this.init();
  }

  /**
   * Faz a configuração dos Jobs da aplicação, usando o 'bee-queue'
   * com o redis.
   */
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queus[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  /**
   * Adicionar job em uma fila especifica. Seja em uma fila de
   * 'CancellationMail' ou outra qualquer.
   * Após isso, ele irá chamar o 'processQueue'.
   */
  add(queue, job) {
    return this.queus[queue].bee.createJob(job).save();
  }

  /**
   * Processa os jobs que estão na fila em tempo real.
   */
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queus[job.key];

      bee.process(handle);
    });
  }
}

export default new Queue();
