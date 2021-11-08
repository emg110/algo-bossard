const clearProg = `
#pragma version 5
int 1
return
`;
const appProg = `
#pragma version 5
txn OnCompletion
int NoOp
==
bnz handle_noop

txn OnCompletion
int OptIn
==
bnz handle_optin

txn OnCompletion
int CloseOut
==
bnz handle_closeout

txn OnCompletion
int UpdateApplication
==
bnz handle_updateapp

txn OnCompletion
int DeleteApplication
==
bnz handle_deleteapp


err

handle_noop:
addr AMESZ5UX7ZJL5M6GYEHXM63OMFCPOJ23UXCQ6CVTI2HVX6WUELYIY262WI
txn Sender
==
bnz handle_optin


byte "bstcrqty"
dup
app_global_get


int 1
+


dup
store 0


app_global_put


int 0
byte "bstcrqty"
app_local_get


int 1
+
store 1


int 0
byte "bstcrqty"
load 1
app_local_put


int 0
byte "bstqty"
txn ApplicationArgs 0
app_local_put


load 0
return

handle_optin:
// Handle OptIn
// approval
int 1
return

handle_closeout:
// Handle CloseOut
//approval
int 1
return

handle_deleteapp:
// Check for creator
addr AMESZ5UX7ZJL5M6GYEHXM63OMFCPOJ23UXCQ6CVTI2HVX6WUELYIY262WI
txn Sender
==
return

handle_updateapp:
// Check for creator
addr AMESZ5UX7ZJL5M6GYEHXM63OMFCPOJ23UXCQ6CVTI2HVX6WUELYIY262WI
txn Sender
==
return
`;
const escrowProg = `
#pragma version 5
b bcheck

baxfer:
txn AssetCloseTo
global ZeroAddress
==
txn AssetAmount
int 1
==
&&
assert
txn TypeEnum
int axfer
==
txn AssetSender
global ZeroAddress
==
&&
assert
int 1
b fin

bacfg:
txn TypeEnum
int acfg
==
b fin

bcheck:
gtxn 0 ApplicationID
int algoBossardAppId
==
txn GroupIndex
int 1
==
&&
gtxn 0 TypeEnum
int appl
==
&&
assert
txn RekeyTo
global ZeroAddress
==
assert
txn Fee
global MinTxnFee
<=
assert
gtxna 0 ApplicationArgs 0
byte "bst_cfg"
==
bnz bacfg
gtxna 0 ApplicationArgs 0
byte "bst-xfer"
==
bnz baxfer
err

fin:
`;
const SmartContracts = { appProg, escrowProg, clearProg };

export default SmartContracts