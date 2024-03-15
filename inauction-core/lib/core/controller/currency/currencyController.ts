import { CurrencyControllerHandler } from './currencyControllerHandler';
import { ICurrencyRepository } from '../../repository/currency/ICurrencyRepository';
import { insufficientParameters, errorResponse, failureResponse } from '../common/handler/responseHandler';
import { ResponseMessages } from '../common/resource/Resource';
import CurrencyRepository from '../../repository/currency/currencyRepository';
import { Request, Response } from 'express';
import { Currency, CurrencyStatus } from '../../schema/currency';
import { AuthorizationCheck } from "../../../middlewares/authorizationCheck";

export class CurrencyController{

    // Create Currency
    public static async create_currency(req: Request, res: Response) {
        let  currencyRepository: ICurrencyRepository = new CurrencyRepository(Currency);
        const handler = CurrencyControllerHandler.checkCurrencyCreationModel(req);

        if (handler) {

            let currency: Currency = new Currency();
            currency.title = handler.title;
            currency.slug = handler.slug;
            currency.status = CurrencyStatus.ACTIVE;

            let timestamp: Date = new Date(Date.now());
            currency.createdAt = timestamp;
            currency.modifiedAt = timestamp;
            currency.isDeleted = false;
            currency.modifiedBy = AuthorizationCheck.getCurrentUser(req);
            const response = await  currencyRepository.create(currency);
            res.send(response);

        } else {
            insufficientParameters(res);
        }
    }

    // Get One Currency
    public static async get_currency(req: Request, res: Response) {
        let  currencyRepository: ICurrencyRepository = new CurrencyRepository(Currency);
        if (req.params.id) {
            const currency_filter = { id: req.params.id };

           await currencyRepository.filterCurrency(currency_filter).then(data => {
            if (data) {
                res.send(data);
            } else {
                failureResponse(ResponseMessages.currencyDoesNotExist, null, res);
            }
       }).catch(err => {
            errorResponse(err, res);
       });

        } else {
            insufficientParameters(res);
        }
    }

    // Get All Currencies
    public static async get_currencies(req: Request, res: Response) {
        let  currencyRepository: ICurrencyRepository = new CurrencyRepository(Currency);
        const currencies = await currencyRepository.getAll();

        if (currencies.length > 0)
            res.send(currencies);
        else
            res.send([]);

    }

    // Get All Active Currencies
    public static async get_currenciesHost(req: Request, res: Response) {
        let  currencyRepository: ICurrencyRepository = new CurrencyRepository(Currency);
        const currencies = await currencyRepository.getActive();

        if (currencies.length > 0)
            res.send(currencies);
        else
            res.send([]);

    }


    // Update Currency
    public static async update_currency(req: Request, res: Response) {
        let  currencyRepository: ICurrencyRepository = new CurrencyRepository(Currency);
        const handler = CurrencyControllerHandler.checkCurrencyCreationModel(req);
        if (handler && req.params.id) {
            const currency_filter = { id: req.params.id };
            let currency = await  currencyRepository.filterCurrency(currency_filter);
            if (currency) {
                currency.title = handler.title;
                currency.slug = handler.slug;
                currency.modifiedAt = new Date(Date.now());
                currency.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                const response = await currencyRepository.updateCurrency(req.params.id, currency);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.currencyDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Change Currency Status
    public static async changeStatus_currency(req: Request, res: Response) {
        let  currencyRepository: ICurrencyRepository = new CurrencyRepository(Currency);

        if (req.params.id) {
            const currency_filter = { id: req.params.id };
            let currency = await  currencyRepository.filterCurrency(currency_filter);

            if (currency) {

                // validate if status is sent in the request and it is different from that resource current status
                if (req.body.status && req.body.status !== currency.status) {
                    currency.status = req.body.status;
                    currency.modifiedAt = new Date(Date.now());
                    currency.modifiedBy = AuthorizationCheck.getCurrentUser(req);
                    const response = await currencyRepository.updateCurrency(req.params.id, currency);
                    res.send(response);
                }
                else {
                    failureResponse(ResponseMessages.badRequestBodyStatus, null, res);
                }

            } else {
                failureResponse(ResponseMessages.currencyDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }

    // Delete Currency
    public static async delete_currency(req: Request, res: Response) {
        let  currencyRepository: ICurrencyRepository = new CurrencyRepository(Currency);
        if (req.params.id) {
            const currency_filter = { id: req.params.id };
            let currency = await  currencyRepository.filterCurrency(currency_filter);
            if (currency) {
                currency.isDeleted = true;
                currency.modifiedAt = new Date(Date.now());
                currency.modifiedBy = AuthorizationCheck.getCurrentUser(req);

                const response = await currencyRepository.updateCurrency(req.params.id, currency);
                res.send(response);

            } else {
                failureResponse(ResponseMessages.currencyDoesNotExist, null, res);
            }
        } else {
            insufficientParameters(res);
        }
    }
}
