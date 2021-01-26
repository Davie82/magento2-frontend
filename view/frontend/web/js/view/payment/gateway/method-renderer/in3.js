/**
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is provided with Magento in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 *
 * Copyright © 2020 MultiSafepay, Inc. All rights reserved.
 * See DISCLAIMER.md for disclaimer details.
 *
 */

/*browser:true*/
/*global define*/
define(
    [
        'jquery',
        'Magento_Checkout/js/view/payment/default',
        'Magento_Checkout/js/action/redirect-on-success',
        'mage/url',
        'mage/translate'
    ],

    /**
     *
     * @param $
     * @param Component
     * @param redirectOnSuccessAction
     * @param url
     * @param $t
     * @returns {*}
     */
    function (
        $,
        Component,
        redirectOnSuccessAction,
        url,
        $t
    ) {
        const config = window.checkoutConfig.payment.multisafepay_in3;
        'use strict';

        let self;

        return Component.extend({
            defaults: {
                template: 'MultiSafepay_ConnectFrontend/payment/gateway/in3',
                dateOfBirth: '',
                genderId: '',
                transactionResult: ''
            },

            initialize: function () {
                this._super()
                    .observe('dateOfBirth')
                    .observe('genderId');
                self = this;
            },

            /**
             * Get the gateway code
             *
             * @returns {string}
             */
            getCode: function () {
                return 'multisafepay_in3';
            },

            /**
             * Get the gateway image
             *
             * @returns {string}
             */
            getImage: function () {
                return config.image;
            },

            /**
             * Get list of genders
             *
             * @returns {*}
             */
            getGenders: function () {
                return [
                    {
                        "code": "mr",
                        "label": $t('Mr.')
                    },
                    {
                        "code": "mrs",
                        "label": $t('Mrs.')
                    }
                ];
            },

            /**
             * Add payment method specific data to additional data
             *
             * @returns {{additional_data: {account_number: *, date_of_birth: *}, method: *}}
             */
            getData: function () {
                return {
                    "method": this.item.method,
                    "additional_data": {
                        'date_of_birth': this.dateOfBirth(),
                        'gender': this.genderId()
                    }
                };
            },

            /**
             * Redirect to controller after place order
             */
            afterPlaceOrder: function () {
                redirectOnSuccessAction.redirectUrl = url.build('multisafepay/connect/redirect/');
                this.redirectAfterPlaceOrder = true;
            }
        });
    }
);
