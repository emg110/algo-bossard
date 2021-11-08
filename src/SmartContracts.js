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
b finerr

handle_noop:
int 1
b bstart



handle_optin:
int 1
b end

handle_closeout:
int 1
b end

handle_deleteapp:
addr AMESZ5UX7ZJL5M6GYEHXM63OMFCPOJ23UXCQ6CVTI2HVX6WUELYIY262WI
txn Sender
==
b end

handle_updateapp:
addr AMESZ5UX7ZJL5M6GYEHXM63OMFCPOJ23UXCQ6CVTI2HVX6WUELYIY262WI
txn Sender
==
b end

bstart:
txn ApplicationID
bz end
txna ApplicationArgs 0
byte "escrow_set"
==
bnz bescrowset
txna ApplicationArgs 0
byte "bst_acfg"
==
bnz bacfg
txna ApplicationArgs 0
byte "bst-axfer"
==
bnz baxfer
b finerr


bescrowset:
txn Sender
global CreatorAddress
==
assert
byte "bossardwallet"
txna ApplicationArgs 1
app_global_put
int 1
&&
b end

bacfgcheck:
global GroupSize
int 2
==
assert
gtxn 1 Sender
byte "bossardwallet"
app_global_get
==
assert
gtxn 1 TypeEnum
int acfg
==
assert
retsub

bacfg:
callsub bacfgcheck
byte "ordercounter"
app_global_get
store 0
gtxn 1 ConfigAssetName
log
byte "bstName"
byte "BST-"
load 0
int 1
+
itob
concat
app_global_put
byte "ordercounter"
dup
app_global_get
int 1
+
app_global_put
int 1
b end

baxfer:
global GroupSize
int 2
==
assert
gtxn 1 Sender
byte "bossardwallet"
app_global_get
==
assert
int 1
&&
b end

finerr:
err
end:
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
return
`;
const SmartContracts = { appProg, escrowProg, clearProg };

export default SmartContracts