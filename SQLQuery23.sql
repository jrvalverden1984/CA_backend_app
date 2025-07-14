--SELECT [CODIGO]
--      ,[DATA]
--      ,[NOMBRE]
--      ,[FEC_REGISTRO]
--      ,[LOGIN]
--      ,[ESTADO]
--      ,[NOMBRE_CORTO]
--      ,[HORAI]
--      ,[HORAF]
--      ,[RIHORAI]
--      ,[RIHORAF]
--      ,[RFHORAI]
--      ,[RFHORAF]
--      ,[MINAENTRAR]
--      ,[MINDSALIR]
--      ,[MINPATRASO]
--      ,[THORARIO]
--      ,[MINLUNCH]
--  FROM [BIO_SYSTEM].[dbo].[TBL_MENTIDAD]
--  --where [NOMBRE] like '%VACA%'
--  where data = 'H'

  SELECT [CODIGO]
      ,[DATA]
      ,[NOMBRE]
      ,[FEC_REGISTRO]
      ,[LOGIN]
      ,[ESTADO]
      ,[NOMBRE_CORTO]
      ,[HORAI]
      ,[HORAF]
      ,[RIHORAI]
      ,[RIHORAF]
      ,[RFHORAI]
      ,[RFHORAF]
      ,[MINAENTRAR]
      ,[MINDSALIR]
      ,[MINPATRASO]
      ,[THORARIO]
      ,[MINLUNCH]
  FROM [BIO_SYSTEM].[dbo].[TBL_MENTIDAD]
  --where [NOMBRE] like '%VACA%'
  where data = 'H'

select * from [dbo].[TBL_MHORARIO_ESPECIAL]


--  select distinct [DATA]
--  from [BIO_SYSTEM].[dbo].[TBL_MENTIDAD]

--C  --> Cargo --> OK
--CC --> Centro Costo
--CT --> Corte
--D  --> Departamento
--F  --> Feriados
--H  --> Horario 
--HE --> Horario Especial
--R  --> Registros


-- Clasificación de tus tablas y casos de uso sugeridos
--Tabla	Tipo	¿Requiere caso de uso?	Casos de uso sugeridos
--TBL_MEMPLEADO	Entidad núcleo	✅ Sí	- CrearEmpleado
--- ActualizarEmpleado
--- CambiarCentroCostoEmpleado
--- Activar/DesactivarEmpleado
--TBL_MCARGO	Maestro/ref	❌ No (opcional)	- ListarCargos (si es solo consulta)
--TBL_MCENTROCOSTO	Maestro/ref	❌ No (opcional)	- ListarCentrosCosto
--TBL_MCORTE	Operativa/Proceso	✅ Sí	- CrearCorteNomina
--- CerrarCorteNomina
--- GenerarResumenCorte
--TBL_MDEPARTAMENTO	Maestro/ref	❌ No (opcional)	- ListarDepartamentos
--TBL_MFERIADO	Calendario/Lógica	✅ Sí	- RegistrarFeriado
--- VerificarSiEsFeriado(fecha)
--TBL_MHORARIO	Maestro operativa	✅ Sí	- CrearHorario
--- AsignarHorarioEmpleado
--TBL_MHORARIO_ESPECIAL	Excepción/Lógica	✅ Sí	- RegistrarHorarioEspecial
--- ConsultarExcepcionesHorario
--TBL_MREGISTRO	Operativa/Núcleo	✅ Sí	- RegistrarEntradaSalida
--- MarcarFalta
--- ObtenerHistorialAsistencia


--comenzemos por la tabla Payroll.JobRole que esta en postgresql el esquema no existe hay que crearlo por la migracion del orm (typeorm), la estructura de la tabla es  
--JobRoleID --> entero incremental, es PK de la tabla PK_JobRole
--Description --> cadena de 180
--como no es una tabla con casos de usos necesito me generes el CRUD de la tabla creacion, lectura de un registro en especifico, actualizacion y eliminacion.
--adicional requiero que tengo un metodo adicional pra devolver los datos paginados se debe enviar a este metodo la pagina y el numero de registros a devolver por 
--pagina, requiero tambien que los metodos contenga la informacion del swagger, la tabla debe tener una entidad para el typeorm, la clave priamra de la tabla es JobRoleID y el nombre del constraint
--debe ser PK_JobRole

--continuaremos por la tabla Payroll.CostCenter que esta en postgresql si el esquema no existe hay que crearlo por la migracion del orm (typeorm), la estructura de la tabla es  
--CostCenterID --> entero incremental, es PK de la tabla PK_CostCenter
--Description --> cadena de 180
--como no es una tabla con casos de usos necesito me generes el CRUD de la tabla creacion, lectura de un registro en especifico, actualizacion y eliminacion.
--adicional requiero que tengo un metodo adicional pra devolver los datos paginados se debe enviar a este metodo la pagina y el numero de registros a devolver por 
--pagina, requiero tambien que los metodos contenga la informacion del swagger, la tabla debe tener una entidad para el typeorm, la clave priamra de la tabla es CostCenterID  y el nombre del constraint
--debe ser PK_CostCenter, debes seguir las mismas indicaciones que se siguieron para la tabla JobRole y que solventamos en el chat

--continuaremos por la tabla Payroll.Holiday que esta en postgresql si el esquema no existe hay que crearlo por la migracion del orm (typeorm), la estructura de la tabla es  
--HolidayID --> entero incremental, es PK de la tabla PK_Holiday
--Description --> cadena de 180
--StartDate --> fecha y hora
--aunque es una tabla con posibles casos de usos necesito me generes el CRUD de la tabla creacion, lectura de un registro en especifico, actualizacion y eliminacion.
--adicional requiero que tengo un metodo adicional pra devolver los datos paginados se debe enviar a este metodo la pagina y el numero de registros a devolver por 
--pagina, requiero tambien que los metodos contenga la informacion del swagger, la tabla debe tener una entidad para el typeorm, la clave priamra de la tabla es HolidayID  y el nombre del constraint
--debe ser PK_Holiday, debes seguir las mismas indicaciones que se siguieron para la tabla JobRole y demas estructuras que solventamos en el chat



--continuaremos por la tabla Payroll.Shift que esta en postgresql si el esquema no existe hay que crearlo por la migracion del orm (typeorm), la estructura de la tabla es  
--ShiftID --> entero incremental, es PK de la tabla PK_Shift
--Description --> cadena de 180
--Start --> fecha y hora
--RangeStartIn --> fecha y hora
--RangeStartOut --> fecha y hora
--End --> fecha y hora
--RangeEndIn --> fecha y hora
--RangeEndOut --> fecha y hora
--aunque es una tabla con posibles casos de usos necesito me generes el CRUD de la tabla creacion, lectura de un registro en especifico, actualizacion y eliminacion.
--adicional requiero que tengo un metodo adicional pra devolver los datos paginados se debe enviar a este metodo la pagina y el numero de registros a devolver por 
--pagina, requiero tambien que los metodos contenga la informacion del swagger, la tabla debe tener una entidad para el typeorm, la clave priamra de la tabla es ShiftID  y el nombre del constraint
--debe ser PK_Shift, debes seguir las mismas indicaciones que se siguieron para la tabla JobRole y demas estructuras que solventamos en el chat


--continuaremos por la tabla Payroll.Schedule que esta en postgresql si el esquema no existe hay que crearlo por la migracion del orm (typeorm), la estructura de la tabla es  
--ScheduleID --> entero incremental, es PK de la tabla PK_Schedule
--Description --> cadena de 180,
--ShortName --> cadena de	25
--MinuteBeforeInput --> entero 
--MinuteAfterOutput --> entero
--MinuteDelay --> entero
--ShiftType	--> entero	
--MinuteLunch	--> entero
--Start --> fecha y hora
--RangeStartIn --> fecha y hora
--RangeStartOut --> fecha y hora
--End --> fecha y hora
--RangeEndIn --> fecha y hora
--RangeEndOut --> fecha y hora
--aunque es una tabla con posibles casos de usos necesito me generes el CRUD de la tabla creacion, lectura de un registro en especifico, actualizacion y eliminacion.
--adicional requiero que tengo un metodo adicional pra devolver los datos paginados se debe enviar a este metodo la pagina y el numero de registros a devolver por 
--pagina, requiero tambien que los metodos contenga la informacion del swagger, la tabla debe tener una entidad para el typeorm, la clave priamra de la tabla es ScheduleID  y el nombre del constraint
--debe ser PK_Schedule, debes seguir las mismas indicaciones que se siguieron para la tabla JobRole y demas estructuras que solventamos en el chat


--continuaremos por la tabla Payroll.ScheduleShift que esta en postgresql si el esquema no existe hay que crearlo por la migracion del orm (typeorm), la estructura de la tabla es  
--ScheduleShiftID --> entero incremental, es PK de la tabla PK_ScheduleShift
--ScheduleID --> entero
--ShiftID --> entero
--aunque es una tabla con posibles casos de usos necesito me generes el CRUD de la tabla creacion, lectura de un registro en especifico, actualizacion y eliminacion.
--adicional requiero que tengo un metodo adicional pra devolver los datos paginados se debe enviar a este metodo la pagina y el numero de registros a devolver por 
--pagina, requiero tambien que los metodos contenga la informacion del swagger, la tabla debe tener una entidad para el typeorm, la clave priamra de la tabla es ScheduleShiftID  y el nombre del constraint
--debe ser PK_ScheduleShift, adicional considerar lo siguiente en la migracion el campos ScheduleID de la tabla Payroll.ScheduleShift debe hacer referencia al campo ScheduleID de la tabla Payroll.Schedule 
--el contraint debe nombrarse FK_ScheduleShift y el campo ShiftID de la tabla Payroll.ScheduleShift debe hacer referencia al campo ShiftID de la tabla Payroll.Shift el el contraint debe nombrarse 
--FK_ScheduleShift_1,debes seguir las mismas indicaciones que se siguieron para la tabla JobRole y demas estructuras que solventamos en el chat


--continuaremos por si te has dado cuenta la tabla Payroll.ScheduleShift es una tabla intermedia entre Payroll.Schedule y Payroll.Shift donde se establecen una realcion de muchos a muchos, hay que crear un 
--caso de usu sobre los casos de uso de la tabla ScheduleShift en donde le pueda enviar uno o mas configuracion de la tabla  Shift y este caso debera guadar una nueva configuracion de Shift si no esta asignado a
--un Schedule o si existe actualizarlo, adicional neceisot un caso de uso que me devuelva todos los Shift asigandos a un Schedule
--debes seguir las mismas indicaciones que se siguieron para la tabla JobRole y demas estructuras que solventamos en el chat




continuaremos por la tabla Payroll.Employee que esta en postgresql si el esquema no existe hay que crearlo por la migracion del orm (typeorm), la estructura de la tabla es  
EmployeeID --> entero incremental, es PK de la tabla PK_Employee
IdentificationNumber --> cadena de 15
FirstName  --> cadena de 35
LastName  --> cadena de 35
DepartmentID --> entero
JobRoleID --> entero
CostCenterID --> entero
ScheduleID --> entero
HireDate --> fecha y hora
Overtime --> logico (verdadero o falso)
Salary --> moneda o numerico de 18, 4
IsActive --> logico (verdadero o falso)
Photo --> imagen
es una tabla con casos de usos necesito me generes el CRUD de la tabla creacion, lectura de un registro en especifico, actualizacion y eliminacion.
adicional requiero que tengo un metodo adicional pra devolver los datos paginados se debe enviar a este metodo la pagina y el numero de registros a devolver por 
pagina, requiero tambien que los metodos contenga la informacion del swagger, la tabla debe tener una entidad para el typeorm, la clave priamra de la tabla es EmployeeID  
y el nombre del constraint debe ser PK_Employee, debes seguir las mismas indicaciones que se siguieron para la tabla JobRole y demas estructuras que solventamos en el chat
adicional consuderar lo siguiente para la migracion
el campo DepartmentID de la tabla Payroll.Employee hace referencia al campo DepartmentID de la tabla Payroll.Department
el campo JobRoleID de la tabla Payroll.Employee hace referencia al campo JobRoleID de la tabla Payroll.JobRole
el campo CostCenterID de la tabla Payroll.Employee hace referencia al campo CostCenterID de la tabla Payroll.CostCenter
el campo ScheduleID de la tabla Payroll.Employee hace referencia al campo ScheduleID de la tabla Payroll.Schedule




        