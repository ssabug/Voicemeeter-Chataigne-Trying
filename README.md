# Voicemeeter-Chataigne-Module
A Chataigne module to be a master of Voicemeeter using its VBVMR DLL API

As the MIDI remote control in voicemeeter seems to have problems, here is a try to use the VM DLL API to control it via chataigne.

Version 0.1
almost nothing works BUT : 
 - VBVMR_Login requests seems to be received by VM as the top left "R" in VM GUI lit after triggering it (once).
 - VBVMR_Logout request after a logging unlits a R in VM GUIb (once)
 - doing another VBVMR_Login after a VBVMR_Login+VBVMR_Logout crashes chataigne
 - sending VBVMR_RunVoicemeeter or VBVMR_SetParameterFloat crashes chataigne everytime
