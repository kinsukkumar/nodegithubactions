/* This page initialises the Next.js server such that it will handle any request
not handled by Express.js*/
import {
    Request, Response, NextFunction,
} from 'express';
import next from 'next';
import util from 'util';

const isNativeError = util.types.isNativeError;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

(async () => {
    try {
        const sourceMapSupport = await import('source-map-support');
        sourceMapSupport.install();
        await app.prepare();
    } catch (ex) {
        console.error("Error hit top-level Next.js layer");
        throw ex;
    }
})();
