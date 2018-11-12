%------------------------------------------%
%        Definition for u1                 %
%------------------------------------------%
u1 = Simulink.AliasType;
u1.Description = '';
u1.DataScope = 'Auto';
u1.HeaderFile = '';
u1.BaseType = 'uint8';

%------------------------------------------%
%        Definition for TRUE               %
%------------------------------------------%
TRUE = Simulink.Parameter;
TRUE.Value = 1;
TRUE.CoderInfo.StorageClass = 'Custom';
TRUE.CoderInfo.Alias = '';
TRUE.CoderInfo.Alignment = -1;
TRUE.CoderInfo.CustomStorageClass = 'Define';
TRUE.DataType = 'uint8';
TRUE.DocUnits = '';

%------------------------------------------%
%        Definition for FALSE               %
%------------------------------------------%
FALSE = Simulink.Parameter;
FALSE.Value = 0;
FALSE.CoderInfo.StorageClass = 'Custom';
FALSE.CoderInfo.Alias = '';
FALSE.CoderInfo.Alignment = -1;
FALSE.CoderInfo.CustomStorageClass = 'Define';
FALSE.DataType = 'uint8';
FALSE.DocUnits = '';