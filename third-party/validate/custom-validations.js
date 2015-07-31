/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

/* Original work by "lehelk" http://lehelk.com/2011/05/06/script-to-remove-diacritics/
   depending of the usecase you may want to add the uppercase letters from this website to the alphabet and change the regex flags */

(function() {
	var alphabet = {
		a: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/ig,
		aa: /[\uA733]/ig,
		ae: /[\u00E6\u01FD\u01E3]/ig,
		ao: /[\uA735]/ig,
		au: /[\uA737]/ig,
		av: /[\uA739\uA73B]/ig,
		ay: /[\uA73D]/ig,
		b: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/ig,
		c: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/ig,
		d: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/ig,
		dz: /[\u01F3\u01C6]/ig,
		e: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/ig,
		f: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/ig,
		g: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/ig,
		h: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/ig,
		hv: /[\u0195]/ig,
		i: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/ig,
		j: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/ig,
		k: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/ig,
		l: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/ig,
		lj: /[\u01C9]/ig,
		m: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/ig,
		n: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/ig,
		nj: /[\u01CC]/ig,
		o: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/ig,
		oi: /[\u01A3]/ig,
		ou: /[\u0223]/ig,
		oo: /[\uA74F]/ig,
		p: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/ig,
		q: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/ig,
		r: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/ig,
		s: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/ig,
		t: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/ig,
		tz: /[\uA729]/ig,
		u: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/ig,
		v: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/ig,
		vy: /[\uA761]/ig,
		w: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/ig,
		x: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/ig,
		y: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/ig,
		z: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/ig
	};

	function replaceDiacritics(str) {
		for (var letter in alphabet) {
			str = str.replace(alphabet[letter], letter);
		}
		return str;
	}

	$.validator.addMethod('notspecialchars', function(value, element) {
		return this.optional(element) || !/\W/.test(replaceDiacritics(value).replace(/\s/g, ''));
	});

	$.validator.addMethod('notnumber', function(value, element) {
		return this.optional(element) || !/\d/.test(value);
	});

	$.validator.addMethod('notrepeat', function(value, element, param) {
		var regex, mixed;

		if (typeof param !== 'string') {
			param = [];
			param[1] = '.';
		}

		mixed = value.replace(/\D/g, '');

		if (!isNaN(mixed)) {
			value = mixed;
		}

		regex = new RegExp("^(" + param[1] + ")\\1+$");

		return this.optional(element) || !regex.test(value);
	}, '{0}');

	$.validator.addMethod('notstartswith', function(value, element, param) {
		return value.indexOf(param) !== 0;
	});

	$.validator.addMethod("fullnamewords", function(value, element, params) {
		return this.optional(element) || /\w{2,}.*?[\W ]+\w{2,}/.test(replaceDiacritics(value));
	});

	$.validator.addMethod("namewords", function(value, element, params) {
		return this.optional(element) || /\w{2,}/.test(replaceDiacritics(value));
	});

	$.validator.addMethod('notEqual', function(value, element, params) {

		var $opposite;

		if (!this.optional(element)) {
			for (var i = params.length - 1; i >= 0; i--) {
				$opposite = $(params[i]);

				if (!$opposite.is(element)) {
					if (value === $opposite.val()) {
						return false;
					}
				}
			};
		}

		return true;
	});

}());


/**
 * Verificação para números de CPF
 */
$.validator.addMethod('doccpf', function(value, element, option) {
	var nonNumbers = /\D/,
		invalidNumbers = /^(.)\1+$/,
		a = [],
		b = 0,
		c = 11;

	if (this.optional(element)) {
		return true;
	}

	value = value.replace(/\D/g, '');

	if (value.length != 11 || nonNumbers.test(value) || invalidNumbers.test(value)) {
		return false;
	}

	for (i = 0; i < 11; i++) {
		a[i] = value.charAt(i);

		if (i < 9) {
			b += (a[i] * --c);
		}
	}

	a[9] = ((x = b % 11) < 2) ? 0 : 11 - x;
	b = 0;
	c = 11;

	for (y = 0; y < 10; y++) {
		b += (a[y] * c--);
	}

	a[10] = ((x = b % 11) < 2) ? 0 : 11 - x;

	if ((value.charAt(9) != a[9]) || (value.charAt(10) != a[10])) {
		return false;
	}

	return true;

}, '{0}');

/**
 * Verificação para números de CNPJ
 */
$.validator.addMethod('cnpj', function(value, element) {

	var a = [],
		b = 0,
		c = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
	value = value.replace(/\D/g, '');

	if (this.optional(element)) {
		return true;
	}

	if (value.length != 14) {
		return false;
	}

	for (i = 0; i < 12; i++) {
		a[i] = value.charAt(i);
		b += a[i] * c[i + 1];
	}

	a[12] = ((x = b % 11) < 2) ? 0 : 11 - x;

	b = 0;

	for (y = 0; y < 13; y++) {
		b += (a[y] * c[y]);
	}

	a[13] = ((x = b % 11) < 2) ? 0 : 11 - x;

	if ((value.charAt(12) != a[12]) || (value.charAt(13) != a[13])) {
		return false;
	}

	return true;

});

(function() {

	$.validator.addMethod('notEqualTelephone', function(value, element, params) {

		var completeNumber, oppositeNumber, areaCode, telephone, opposite;

		function findOnTelephoneGroup(selector) {
			return $(element).closest('.telephone-group').find(selector);
		}

		areaCode = findOnTelephoneGroup('.area-code').val(),
			telephone = findOnTelephoneGroup('.telephone').val();
		completeNumber = areaCode + telephone;

		for (var i = params.length - 1; i >= 0; i--) {
			opposite = params[i];
			$areaCode = $(opposite.areaCode);
			$telephone = $(opposite.telephone);
			oppositeNumber = $areaCode.val() + $telephone.val();

			if (oppositeNumber && !$areaCode.is(element) && !$telephone.is(element)) {
				if (completeNumber === oppositeNumber) {
					return false;
				}
			}
		};

		return true;
	});
}());

$.validator.addMethod('new-password', function(value, element) {
	return this.optional(element) || new RegExp(Properties['regex.password']).test(value);
});

$.validator.addMethod('notdefault', function(value, element) {
	var $element = $(element);
	return value && value != $element.attr('placeholder');
});

$.validator.addMethod('emailList', function(value, element) {
	var emails, length, validate;
	if (value) {
		emails = $.trim(value).split(',');
		length = emails.length;
		validate = $(element.form).validate();

		while (length) {
			email = emails[--length];
			if (email && !$.validator.methods.email.call(validate, email, element)) {
				return false;
			}
		}
	}
	return true;
});

$.validator.addMethod('passwordStrength', function(value, element, params) {
	return this.optional(element) || $(element).data('strength') === 'strong';
}, '{0}');

$.validator.addMethod('checkFn', function(value, element, params) {
	return this.optional(element) || params[1](value, element);
}, '{0}');

$.validator.addMethod('onlyOne', function(value, element, params) {

	var _this = this,
		$element = $(element),
		siblingsSelector = params[1],
		scopeSelector = params[2],
		repeated = false,
		$repeat,
		$elements = $element.closest(scopeSelector).find(siblingsSelector).not(element),
		$elementsFirst = $elements.eq(0),
		validator = $elementsFirst.data('validate_only_one') ? $elementsFirst.data('validate_only_one') : $.extend({}, this);

	$elementsFirst.data('validate_only_one', validator);

	$repeat = $elements.filter(function() {
		return value === $(this).val();
	});

	if (!$element.data('being_validated')) {

		$elements.data('being_validated', true);

		$elements.each(function() {
			validator.element(this);
		});

		$elements.data('being_validated', false);
	}

	return this.optional(element) || !$repeat.length;
}, '{0}');


(function() {
	'use strict';

	$.validator.addMethod('cvc', function(value, element, params) {
		var properties = $(element).data('creditCard'),
			cvcSize = 3;

		if (properties) {
			cvcSize = properties ? parseInt(properties.cvcSize, 10) : 0;
		}

		return this.optional(element) || cvcSize && (cvcSize === value.length);

	}, '{0}');

	$.validator.addMethod('creditCardBrand', function(value, element, params) {
		var cardNumber = value.replace(/\D/g, ''),
			properties = $(element).data('creditCard'),
			regex = '',
			valid = false;

		if (properties) {
			regex = new RegExp($.trim(properties.rule));
			valid = regex.test(cardNumber);
		}

		return this.optional(element) || valid;
	}, '{0}');

}());

(function() {

	function equalsToSimilar(element) {

		var type = $(element).attr('type'),
			reference = $(element).closest('fieldset').find('[type=' + type + ']').not(element).val();

		return element.value === reference;
	}

	$.validator.addMethod('confirmation', function(value, element) {
		return this.optional(element) || equalsToSimilar(element);
	});

	$.validator.addMethod('requiredDependence', function(value, element) {
		return value && value !== '0';
	});
}());


(function() {

	function getComparableDate(strdate) {
		return strdate.split('/').reverse().join('');
	}

	function getAge(date, unit) {

		var a = moment(),
			b = moment(date, 'DDMMYYYY');

		return a.diff(b, unit);
	}

	/**
	 * Verificação para anos bissextos
	 *
	 * @param {String} date Ano
	 * @return {boolean}
	 */
	function isLeapYear(date) {

		var year = parseInt(date, 10);

		if (!isNaN(year)) {
			if (year % 400 === 0) {
				return true;
			} else if ((year % 4 === 0) && (year % 100 !== 0)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Verificação de data
	 */
	$.validator.addMethod('dateBR', function(value, element) {

		var regexDate = /^((0[1-9]|[12]\d)\/(0[1-9]|1[0-2])|30\/(0[13-9]|1[0-2])|31\/(0[13578]|1[02]))\/\d{4}$/,
			regexLeapDay = /^29\/02\/\d{4}$/,
			year;

		if (regexDate.test(value)) {

			year = value.substr(value.lastIndexOf("/") + 1);

			if (regexLeapDay.test(value) && !isLeapYear(year)) {
				return false;
			}

			return true;
		}

		return this.optional(element) || false;

	});

	$.validator.addMethod('minAge', function(value, element, params) {
		return this.optional(element) || getAge(value, 'years') >= params[0];
	}, $.validator.messages.minAge);

	$.validator.addMethod('dateIsValid', function(value, element, params) {
		return this.optional(element) || moment(value, params[1]).isValid();
	}, '{0}');

	$.validator.addMethod('fullDateIsValid', function(value, element, params) {
		return this.optional(element) || moment(value, params[1], true).isValid();
	}, '{0}');

	$.validator.addMethod('dateIsAfter', function(value, element, params) {
		return this.optional(element) || !moment(value, params[1]).isBefore(params[2], params[3]);
	}, '{0}');

	$.validator.addMethod('dateIsBefore', function(value, element, params) {
		return this.optional(element) || !moment(value, params[1]).isAfter(params[2]);
	}, '{0}');

	$.validator.addMethod('period', function(value, element, params) {

		function isFilled() {
			return !!$(this).val();
		}

		function synchronize(element, $elements) {

			var $element = $(element),
				validator = $(element.form).validate();

			if (!$element.data('being_validated')) {

				$elements.data('being_validated', true);

				$elements.each(function() {
					validator.element(this);
				});

				$elements.data('being_validated', false);
			}
		}

		var $scope = $(element).closest('.validate--scope'),
			$elements = $scope.find('.calendar > input'),
			$filled = $elements.filter(isFilled),
			$start = $elements.first(),
			$end = $elements.last(),
			start, end;

		synchronize(element, $elements);

		if ($filled.length === $elements.length) {
			start = moment($start.val(), params[1]);
			end = moment($end.val(), params[1]);

			return this.optional(element) || !start.isAfter(end);
		}

		return true;
	}, '{0}');

	$.validator.addMethod('permanence', function(value, element, mindate) {

		var $group = $(element).closest('fieldset'),
			years = $group.find('.years').val() || 0,
			months = $group.find('.months').val() || 0,
			entry;

		mindate = typeof mindate === 'function' ? mindate() : mindate;

		entry = moment().subtract('years', years).subtract('months', months);

		return this.optional(element) || moment(mindate, 'DDMMYYYY').isBefore(entry, 'months');
	});

	/**
	 * Verificação de data
	 */
	$.validator.addMethod('minDateBR', function(value, element, mindate) {
		mindate = typeof mindate === 'function' ? mindate(element) : mindate;

		return this.optional(element) || (getComparableDate(value) >= getComparableDate(mindate));
	});


	/**
	 * Verificação de data
	 */
	$.validator.addMethod('maxDateBR', function(value, element, maxdate) {
		maxdate = typeof maxdate === 'function' ? maxdate(element) : maxdate;

		return this.optional(element) || (getComparableDate(value) <= getComparableDate(maxdate));
	});

	/**
	 * Verificação de data
	 */
	$.validator.addMethod('holiday', function(value, element, holidays) {
		return this.optional(element) || $.inArray(value, holidays) == -1;
	});

	/**
	 * Verificação de data
	 */
	$.validator.addMethod('dateRange', function(value, element, data) {
		return this.optional(element) || (getComparableDate($(data.from).val()) <= getComparableDate($(data.to).val()));
	});


	/**
	 * Verificação de data
	 */
	$.validator.addMethod('optDateRange', function(value, element, data) {

		var from = $(data.from).val(),
			to = $(data.to).val();

		if (from && to) {
			return this.optional(element) || (getComparableDate(from) <= getComparableDate(to));
		}

		return true;
	});

	/**
	 *
	 */
	$.validator.addMethod('autoEqualTo', function(value, element, params) {

		var selector = $(element).data('equal-to');

		return this.optional(element) || ($(selector).val() === value);

	}, '{0}');

	$.validator.addMethod("cMinlength", function(value, element, param) {

		return $.validator.methods.minlength.call(this, value, element, param[1]);

	}, '{0}');

	$.validator.addMethod("cMaxlength", function(value, element, param) {

		return $.validator.methods.maxlength.call(this, value, element, param[1]);

	}, '{0}');

}());


(function() {

	function mutualDependence(element) {
		return !!$(element).siblings('input').val();
	}

	function reverseDepedence(groupSelector, oppositeSelector) {

		return function(element) {

			var value = $(element).closest(groupSelector).find(oppositeSelector).val();

			return (!value || value === '0');
		};
	}

	$.validator.addClassRules({
		'address': {
			notspecialchars: true
		},
		'area-code': {
			number: true,
			maxlength: 2,
			minlength: 2
		},
		'city': {
			notspecialchars: true
		},
		'district': {
			notspecialchars: true
		},
		'full-name': {
			fullnamewords: true,
			notspecialchars: true,
			notnumber: true
		},
		'message': {
			maxlength: 400
		},
		'reference': {
			namewords: true,
			notspecialchars: true,
			notnumber: true
		},
		'rg': {
			notspecialchars: true,
			notrepeat: true
		},
		'telephone': {
			maxlength: 9,
			minlength: 8,
			notrepeat: true,
			notstartswith: 1
		},
		'optional-telephone': {
			required: {
				depends: mutualDependence
			}
		},
		'optional-area-code': {
			required: {
				depends: mutualDependence
			}
		},
		'permanence-years': {
			requiredDependence: {
				depends: reverseDepedence('.permanence-group', '.permanence-months')
			}
		},
		'permanence-months': {
			max: 11,
			requiredDependence: {
				depends: reverseDepedence('.permanence-group', '.permanence-years')
			}
		},
		'income': {
			notdefault: true
		},
		'email-list': {
			emailList: true
		},
		'notdefault': {
			notdefault: true
		},
		'validate--phone': {
			onlyOne: [$.validator.messages.repeatedPhone, '.phone-number', '.validate__scope-phones'],
			cMinlength: [$.validator.messages.phone, 14],
			cMaxlength: [$.validator.messages.phone, 15]
		},
		'validate--date': {
			dateBR: true,
			minDateBR: '01/01/1900',
			date: false
		},
		'validate--dispatch': {
			dateIsValid: [$.validator.messages.dispatchDate, 'DD/MM/YYYY'],
			dateIsBefore: [$.validator.messages.dispatchDate, 'DD/MM/YYYY', moment()]
		},
		'validate--cep': {
			cMinlength: [$.validator.messages.cep, 9],
			cMaxlength: [$.validator.messages.cep, 9],
			notrepeat: [$.validator.messages.cep, '0']
		},
		'validate--credit-card': {
			cMaxlength: [$.validator.messages.creditCard, 19],
			cMinlength: [$.validator.messages.creditCard, 16],
			creditCardBrand: [$.validator.messages.creditCard],
			onlyOne: [$.validator.messages.repeatedCreditCard, '.card-number', '.validate__scope-credit-card'],
			onkeyup: false
		},

		'validate--cvc': {
			cvc: [$.validator.messages.invalidCVC]
		},

		'validate--expiration': {
			dateIsValid: [$.validator.messages.invalidDate, 'MM/YY'],
			dateIsAfter: [$.validator.messages.invalidCardExpiration, 'MM/YY', moment(), 'month']
		},

		'validate--cpf': {
			maxlength: 14,
			minlength: 2,
			doccpf: [$.validator.messages.cpf]
		},
		'validate--birthdate': {
			dateBR: true,
			minDateBR: '01/01/1900',
			maxDateBR: moment().format('DD/MM/YYYY'),
			//minAge: ['teste {0}' + $.validator.messages.minAge, 18],
			minAge: [18],
			date: false
		},
		'validate--email-confirmation': {
			autoEqualTo: [$.validator.messages.emailConfirmation]
		},
		'validate--password': {
			password: false,
			minlength: 8,
			maxlength: 20,
			passwordStrength: [$.validator.messages.password]
		},
		'validate--password-confirmation': {
			autoEqualTo: [$.validator.messages.passwordConfirmation]
		},
		'validate--scope-dependence': {
			required: function(element) {

				var hasFilled = false,
					$elements = $(element).closest('.validate--scope')
					.find('.validate--scope-dependence')
					.not(element)
					.filter(function() {
						return !!$(this).val();
					});

				if ($elements) {
					hasFilled = !!$elements.length;
				}

				return hasFilled;
			}
		},
		'validate--nickname': {
			minlength: 3,
			maxlength: 40
		},
		'validate--name': {
			minlength: 3,
			maxlength: 60
		},
		'validate--email': {
			minlength: 3,
			maxlength: 150
		},
		'validate--street': {
			minlength: 3,
			maxlength: 60
		},
		'validate--neighborhood': {
			minlength: 2,
			maxlength: 100
		},
		'validate--complement': {
			minlength: 3,
			maxlength: 100
		},
		'validate--address-nickname': {
			minlength: 3,
			maxlength: 100
		},
		'validate--address-number': {
			maxlength: 5
		},
		'validate--address-receiver': {
			minlength: 3,
			maxlength: 50
		},

		'validate--period': {
			date: false,
			dateIsValid: [$.validator.messages.invalidDate, Stelo.isMobile() ? 'YYYY-MM-DD' : 'DD/MM/YY'],
			period: [$.validator.messages.invalidPeriod, Stelo.isMobile() ? 'YYYY-MM-DD' : 'DD/MM/YY']
		}
	});
}());
