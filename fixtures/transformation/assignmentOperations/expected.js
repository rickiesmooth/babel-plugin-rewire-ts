let value = 'initial';

export function getValue() {
	return _get__('value');
}

export function setValue(newValue) {
	_assign__('value', newValue);
}

export function assign(newValue) {
	return _assign__('value', newValue);
}

export function additionAssignement(addition) {
	return _assign__('value', _get__('value') + addition);
}

export function subtractionAssignment(valueToSubtract) {
	return _assign__('value', _get__('value') - valueToSubtract);
}

export function multiplicationAssignment(valueToMultiply) {
	return _assign__('value', _get__('value') * valueToMultiply);
}

export function divisionAssignment(valueToDivideWith) {
	return _assign__('value', _get__('value') / valueToDivideWith);
}

export function remainderAssignement(valueToCalculcateModulWith) {
	return _assign__('value', _get__('value') % valueToCalculcateModulWith);
}

export function leftShiftAssignment(amountToShift) {
	return _assign__('value', _get__('value') << amountToShift);
}

export function rightShiftAssignment(amountToShift) {
	return _assign__('value', _get__('value') >> amountToShift);
}

export function unsignedRightShiftAssignment(amountToShift) {
	return _assign__('value', _get__('value') >>> amountToShift);
}

export function bitwiseAndAssignement(operand) {
	return _assign__('value', _get__('value') & operand);
}

export function bitwiseOrAssignement(operand) {
	return _assign__('value', _get__('value') | operand);
}

export function bitwiseXorAssignment(operand) {
	return _assign__('value', _get__('value') ^ operand);
}

function _getGlobalObject() {
	try {
		if (!!global) {
			return global;
		}
	} catch (e) {
		try {
			if (!!window) {
				return window;
			}
		} catch (e) {
			return this;
		}
	}
}

;
var _RewireModuleId__ = null;

function _getRewireModuleId__() {
	if (_RewireModuleId__ === null) {
		let globalVariable = _getGlobalObject();

		if (!globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__) {
			globalVariable.__$$GLOBAL_REWIRE_NEXT_MODULE_ID__ = 0;
		}

		_RewireModuleId__ = __$$GLOBAL_REWIRE_NEXT_MODULE_ID__++;
	}

	return _RewireModuleId__;
}

function _getRewireRegistry__() {
	let theGlobalVariable = _getGlobalObject();

	if (!theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__) {
		theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
	}

	return theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__;
}

function _getRewiredData__() {
	let moduleId = _getRewireModuleId__();

	let registry = _getRewireRegistry__();

	let rewireData = registry[moduleId];

	if (!rewireData) {
		registry[moduleId] = Object.create(null);
		rewireData = registry[moduleId];
	}

	return rewireData;
}

(function registerResetAll() {
	let theGlobalVariable = _getGlobalObject();

	if (!theGlobalVariable['__rewire_reset_all__']) {
		theGlobalVariable['__rewire_reset_all__'] = function () {
			theGlobalVariable.__$$GLOBAL_REWIRE_REGISTRY__ = Object.create(null);
		};
	}
})();

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
let _RewireAPI__ = {};

(function () {
	function addPropertyToAPIObject(name, value) {
		Object.defineProperty(_RewireAPI__, name, {
			value: value,
			enumerable: false,
			configurable: true
		});
	}

	addPropertyToAPIObject('__get__', _get__);
	addPropertyToAPIObject('__GetDependency__', _get__);
	addPropertyToAPIObject('__Rewire__', _set__);
	addPropertyToAPIObject('__set__', _set__);
	addPropertyToAPIObject('__reset__', _reset__);
	addPropertyToAPIObject('__ResetDependency__', _reset__);
	addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
	let rewireData = _getRewiredData__();

	if (rewireData[variableName] === undefined) {
		return _get_original__(variableName);
	} else {
		var value = rewireData[variableName];

		if (value === INTENTIONAL_UNDEFINED) {
			return undefined;
		} else {
			return value;
		}
	}
}

function _get_original__(variableName) {
	switch (variableName) {
		case 'value':
			return value;
	}

	return undefined;
}

function _assign__(variableName, value) {
	let rewireData = _getRewiredData__();

	if (rewireData[variableName] === undefined) {
		return _set_original__(variableName, value);
	} else {
		return rewireData[variableName] = value;
	}
}

function _set_original__(variableName, _value) {
	switch (variableName) {
		case 'value':
			return value = _value;
	}

	return undefined;
}

function _update_operation__(operation, variableName, prefix) {
	var oldValue = _get__(variableName);

	var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

	_assign__(variableName, newValue);

	return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
	let rewireData = _getRewiredData__();

	if (typeof variableName === 'object') {
		Object.keys(variableName).forEach(function (name) {
			rewireData[name] = variableName[name];
		});
		return function () {
			Object.keys(variableName).forEach(function (name) {
				_reset__(variableName);
			});
		};
	} else {
		if (value === undefined) {
			rewireData[variableName] = INTENTIONAL_UNDEFINED;
		} else {
			rewireData[variableName] = value;
		}

		return function () {
			_reset__(variableName);
		};
	}
}

function _reset__(variableName) {
	let rewireData = _getRewiredData__();

	delete rewireData[variableName];

	if (Object.keys(rewireData).length == 0) {
		delete _getRewireRegistry__()[_getRewireModuleId__];
	}

	;
}

function _with__(object) {
	let rewireData = _getRewiredData__();

	var rewiredVariableNames = Object.keys(object);
	var previousValues = {};

	function reset() {
		rewiredVariableNames.forEach(function (variableName) {
			rewireData[variableName] = previousValues[variableName];
		});
	}

	return function (callback) {
		rewiredVariableNames.forEach(function (variableName) {
			previousValues[variableName] = rewireData[variableName];
			rewireData[variableName] = object[variableName];
		});
		let result = callback();

		if (!!result && typeof result.then == 'function') {
			result.then(reset).catch(reset);
		} else {
			reset();
		}

		return result;
	};
}

export { _get__ as __get__, _get__ as __GetDependency__, _set__ as __Rewire__, _set__ as __set__, _reset__ as __ResetDependency__, _RewireAPI__ as __RewireAPI__ };
export default _RewireAPI__;