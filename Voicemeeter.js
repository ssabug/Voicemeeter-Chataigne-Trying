var dynamicLibrary = undefined;
var logged=false;

function init(){
    script.log('Script Init');
	
	script.log("Voicemeeter API DLL path : " + local.parameters.voicemeeterAPIDLLPath.get() );
	dynamicLibrary=util.loadDynamicLibrary(local.parameters.voicemeeterAPIDLLPath.get());
	
	if (!dynamicLibrary ) {		
		script.log("Voicemeeter DLL Loading error ");		
	}
	else {
		
		//runVM=util.findFunctionInDynamicLibrary(dynamicLibrary, "VBVMR_RunVoicemeeter");
		//setParam=util.findFunctionInDynamicLibrary(dynamicLibrary, "VBVMR_SetParameterFloat");
		
		/*setTimeout(function(){
			script.log(typeof res);
			},30000);*/
		//util.delayThreadMS(5000);
		/*
		if ( res ==1 ) {
			script.log("Voicemeeter API login successful ");
			runVM(2);

			}
		else {script.log("Voicemeeter API login error ");}*/
		//script.log(res);
		//script.log(obj);
		//script.log(t);
		//script.log(vResult);
	}
}

function VMAPI_login() {
	script.log("Starting Voicemeeter API login");
	login = util.findFunctionInDynamicLibrary(dynamicLibrary, "VBVMR_Login");
	script.log(login.vResult);
	return login();
}

function VMAPI_runVM(arg) {
	script.log("Starting Voicemeeter Application");
	runVM = util.findFunctionInDynamicLibrary(dynamicLibrary, "VBVMR_RunVoicemeeter");	
	return runVM(arg);
}

function VMAPI_setParamValue(dynamicLibrary,paramName,value) {
	script.log("Sending param value to Voicemeeter API");
	setParam=util.findFunctionInDynamicLibrary(dynamicLibrary, "VBVMR_SetParameterFloat");
	
	return setParam(paramName,value);
}

function VMAPI_getParamValue(dynamicLibrary,paramName) {
	script.log("Getting param value from Voicemeeter API");
	getParam = util.findFunctionInDynamicLibrary(dynamicLibrary, "VBVMR_GetParameterFloat");
	var value=undefined;
	getParam(paramName,value );
	return value;
}

function moduleParameterChanged(param)
{
	script.log('moduleParameterChanged');
	if (param.name == "login") {
		//setTimeout(VMAPI_login(),100000);
		VMAPI_login();
		script.log("login request ended");
		VMAPI_runVM(2);
	}
}

function moduleValueChanged(value){
    script.log('moduleValueChanged');
    //script.log(value.isParameter());
	script.log(typeof logged);

    if (value.isParameter()){
        
    }
}

