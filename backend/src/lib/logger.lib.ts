import pino from 'pino';

const logger = pino({
  level: 'trace',
  base: null,
  prettyPrint: {
    colorize: true,
  },
  nestedKey: 'data',
  serializers: {
    /* eslint-disable */
    data: (data: any | Error) => {
      if (data instanceof Error) {
        return { err: pino.stdSerializers.err(data) };
      }

      if (data.err) {
        data.err = pino.stdSerializers.err(data.err);
      }

      return data;
    },
  },
});

export default logger;
