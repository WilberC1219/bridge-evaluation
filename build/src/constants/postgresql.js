"use strict";
/* eslint-disable max-len */
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTGRESQL_ERROR = void 0;
// Source is here: https://github.com/nihalgonsalves/pg-error-enum/blob/main/src/POSTGRESQL_ERROR.ts
var POSTGRESQL_ERROR;
(function (POSTGRESQL_ERROR) {
    /** Class 00 - Successful Completion: [S] successful_completion */
    POSTGRESQL_ERROR["SUCCESSFUL_COMPLETION"] = "00000";
    /** Class 01 - Warning: [W] warning */
    POSTGRESQL_ERROR["WARNING"] = "01000";
    /** Class 01 - Warning: [W] dynamic_result_sets_returned */
    POSTGRESQL_ERROR["WARNING_DYNAMIC_RESULT_SETS_RETURNED"] = "0100C";
    /** Class 01 - Warning: [W] implicit_zero_bit_padding */
    POSTGRESQL_ERROR["WARNING_IMPLICIT_ZERO_BIT_PADDING"] = "01008";
    /** Class 01 - Warning: [W] null_value_eliminated_in_set_function */
    POSTGRESQL_ERROR["WARNING_NULL_VALUE_ELIMINATED_IN_SET_FUNCTION"] = "01003";
    /** Class 01 - Warning: [W] privilege_not_granted */
    POSTGRESQL_ERROR["WARNING_PRIVILEGE_NOT_GRANTED"] = "01007";
    /** Class 01 - Warning: [W] privilege_not_revoked */
    POSTGRESQL_ERROR["WARNING_PRIVILEGE_NOT_REVOKED"] = "01006";
    /** Class 01 - Warning: [W] string_data_right_truncation */
    POSTGRESQL_ERROR["WARNING_STRING_DATA_RIGHT_TRUNCATION"] = "01004";
    /** Class 01 - Warning: [W] deprecated_feature */
    POSTGRESQL_ERROR["WARNING_DEPRECATED_FEATURE"] = "01P01";
    /** Class 02 - No Data (this is also a warning class per the SQL standard): [W] no_data */
    POSTGRESQL_ERROR["NO_DATA"] = "02000";
    /** Class 02 - No Data (this is also a warning class per the SQL standard): [W] no_additional_dynamic_result_sets_returned */
    POSTGRESQL_ERROR["NO_ADDITIONAL_DYNAMIC_RESULT_SETS_RETURNED"] = "02001";
    /** Class 03 - SQL Statement Not Yet Complete: [E] sql_statement_not_yet_complete */
    POSTGRESQL_ERROR["SQL_STATEMENT_NOT_YET_COMPLETE"] = "03000";
    /** Class 08 - Connection Exception: [E] connection_exception */
    POSTGRESQL_ERROR["CONNECTION_EXCEPTION"] = "08000";
    /** Class 08 - Connection Exception: [E] connection_does_not_exist */
    POSTGRESQL_ERROR["CONNECTION_DOES_NOT_EXIST"] = "08003";
    /** Class 08 - Connection Exception: [E] connection_failure */
    POSTGRESQL_ERROR["CONNECTION_FAILURE"] = "08006";
    /** Class 08 - Connection Exception: [E] sqlclient_unable_to_establish_sqlconnection */
    POSTGRESQL_ERROR["SQLCLIENT_UNABLE_TO_ESTABLISH_SQLCONNECTION"] = "08001";
    /** Class 08 - Connection Exception: [E] sqlserver_rejected_establishment_of_sqlconnection */
    POSTGRESQL_ERROR["SQLSERVER_REJECTED_ESTABLISHMENT_OF_SQLCONNECTION"] = "08004";
    /** Class 08 - Connection Exception: [E] transaction_resolution_unknown */
    POSTGRESQL_ERROR["TRANSACTION_RESOLUTION_UNKNOWN"] = "08007";
    /** Class 08 - Connection Exception: [E] protocol_violation */
    POSTGRESQL_ERROR["PROTOCOL_VIOLATION"] = "08P01";
    /** Class 09 - Triggered Action Exception: [E] triggered_action_exception */
    POSTGRESQL_ERROR["TRIGGERED_ACTION_EXCEPTION"] = "09000";
    /** Class 0A - Feature Not Supported: [E] feature_not_supported */
    POSTGRESQL_ERROR["FEATURE_NOT_SUPPORTED"] = "0A000";
    /** Class 0B - Invalid Transaction Initiation: [E] invalid_transaction_initiation */
    POSTGRESQL_ERROR["INVALID_TRANSACTION_INITIATION"] = "0B000";
    /** Class 0F - Locator Exception: [E] locator_exception */
    POSTGRESQL_ERROR["LOCATOR_EXCEPTION"] = "0F000";
    /** Class 0F - Locator Exception: [E] invalid_locator_specification */
    POSTGRESQL_ERROR["L_E_INVALID_SPECIFICATION"] = "0F001";
    /** Class 0L - Invalid Grantor: [E] invalid_grantor */
    POSTGRESQL_ERROR["INVALID_GRANTOR"] = "0L000";
    /** Class 0L - Invalid Grantor: [E] invalid_grant_operation */
    POSTGRESQL_ERROR["INVALID_GRANT_OPERATION"] = "0LP01";
    /** Class 0P - Invalid Role Specification: [E] invalid_role_specification */
    POSTGRESQL_ERROR["INVALID_ROLE_SPECIFICATION"] = "0P000";
    /** Class 0Z - Diagnostics Exception: [E] diagnostics_exception */
    POSTGRESQL_ERROR["DIAGNOSTICS_EXCEPTION"] = "0Z000";
    /** Class 0Z - Diagnostics Exception: [E] stacked_diagnostics_accessed_without_active_handler */
    POSTGRESQL_ERROR["STACKED_DIAGNOSTICS_ACCESSED_WITHOUT_ACTIVE_HANDLER"] = "0Z002";
    /** Class 20 - Case Not Found: [E] case_not_found */
    POSTGRESQL_ERROR["CASE_NOT_FOUND"] = "20000";
    /** Class 21 - Cardinality Violation: [E] cardinality_violation */
    POSTGRESQL_ERROR["CARDINALITY_VIOLATION"] = "21000";
    /** Class 22 - Data Exception: [E] data_exception */
    POSTGRESQL_ERROR["DATA_EXCEPTION"] = "22000";
    /** Class 22 - Data Exception: [E]  */
    POSTGRESQL_ERROR["ARRAY_ELEMENT_ERROR"] = "2202E";
    /** Class 22 - Data Exception: [E] array_subscript_error */
    POSTGRESQL_ERROR["ARRAY_SUBSCRIPT_ERROR"] = "2202E";
    /** Class 22 - Data Exception: [E] character_not_in_repertoire */
    POSTGRESQL_ERROR["CHARACTER_NOT_IN_REPERTOIRE"] = "22021";
    /** Class 22 - Data Exception: [E] datetime_field_overflow */
    POSTGRESQL_ERROR["DATETIME_FIELD_OVERFLOW"] = "22008";
    /** Class 22 - Data Exception: [E]  */
    POSTGRESQL_ERROR["DATETIME_VALUE_OUT_OF_RANGE"] = "22008";
    /** Class 22 - Data Exception: [E] division_by_zero */
    POSTGRESQL_ERROR["DIVISION_BY_ZERO"] = "22012";
    /** Class 22 - Data Exception: [E] error_in_assignment */
    POSTGRESQL_ERROR["ERROR_IN_ASSIGNMENT"] = "22005";
    /** Class 22 - Data Exception: [E] escape_character_conflict */
    POSTGRESQL_ERROR["ESCAPE_CHARACTER_CONFLICT"] = "2200B";
    /** Class 22 - Data Exception: [E] indicator_overflow */
    POSTGRESQL_ERROR["INDICATOR_OVERFLOW"] = "22022";
    /** Class 22 - Data Exception: [E] interval_field_overflow */
    POSTGRESQL_ERROR["INTERVAL_FIELD_OVERFLOW"] = "22015";
    /** Class 22 - Data Exception: [E] invalid_argument_for_logarithm */
    POSTGRESQL_ERROR["INVALID_ARGUMENT_FOR_LOG"] = "2201E";
    /** Class 22 - Data Exception: [E] invalid_argument_for_ntile_function */
    POSTGRESQL_ERROR["INVALID_ARGUMENT_FOR_NTILE"] = "22014";
    /** Class 22 - Data Exception: [E] invalid_argument_for_nth_value_function */
    POSTGRESQL_ERROR["INVALID_ARGUMENT_FOR_NTH_VALUE"] = "22016";
    /** Class 22 - Data Exception: [E] invalid_argument_for_power_function */
    POSTGRESQL_ERROR["INVALID_ARGUMENT_FOR_POWER_FUNCTION"] = "2201F";
    /** Class 22 - Data Exception: [E] invalid_argument_for_width_bucket_function */
    POSTGRESQL_ERROR["INVALID_ARGUMENT_FOR_WIDTH_BUCKET_FUNCTION"] = "2201G";
    /** Class 22 - Data Exception: [E] invalid_character_value_for_cast */
    POSTGRESQL_ERROR["INVALID_CHARACTER_VALUE_FOR_CAST"] = "22018";
    /** Class 22 - Data Exception: [E] invalid_datetime_format */
    POSTGRESQL_ERROR["INVALID_DATETIME_FORMAT"] = "22007";
    /** Class 22 - Data Exception: [E] invalid_escape_character */
    POSTGRESQL_ERROR["INVALID_ESCAPE_CHARACTER"] = "22019";
    /** Class 22 - Data Exception: [E] invalid_escape_octet */
    POSTGRESQL_ERROR["INVALID_ESCAPE_OCTET"] = "2200D";
    /** Class 22 - Data Exception: [E] invalid_escape_sequence */
    POSTGRESQL_ERROR["INVALID_ESCAPE_SEQUENCE"] = "22025";
    /** Class 22 - Data Exception: [E] nonstandard_use_of_escape_character */
    POSTGRESQL_ERROR["NONSTANDARD_USE_OF_ESCAPE_CHARACTER"] = "22P06";
    /** Class 22 - Data Exception: [E] invalid_indicator_parameter_value */
    POSTGRESQL_ERROR["INVALID_INDICATOR_PARAMETER_VALUE"] = "22010";
    /** Class 22 - Data Exception: [E] invalid_parameter_value */
    POSTGRESQL_ERROR["INVALID_PARAMETER_VALUE"] = "22023";
    /** Class 22 - Data Exception: [E] invalid_preceding_or_following_size */
    POSTGRESQL_ERROR["INVALID_PRECEDING_OR_FOLLOWING_SIZE"] = "22013";
    /** Class 22 - Data Exception: [E] invalid_regular_expression */
    POSTGRESQL_ERROR["INVALID_REGULAR_EXPRESSION"] = "2201B";
    /** Class 22 - Data Exception: [E] invalid_row_count_in_limit_clause */
    POSTGRESQL_ERROR["INVALID_ROW_COUNT_IN_LIMIT_CLAUSE"] = "2201W";
    /** Class 22 - Data Exception: [E] invalid_row_count_in_result_offset_clause */
    POSTGRESQL_ERROR["INVALID_ROW_COUNT_IN_RESULT_OFFSET_CLAUSE"] = "2201X";
    /** Class 22 - Data Exception: [E] invalid_tablesample_argument */
    POSTGRESQL_ERROR["INVALID_TABLESAMPLE_ARGUMENT"] = "2202H";
    /** Class 22 - Data Exception: [E] invalid_tablesample_repeat */
    POSTGRESQL_ERROR["INVALID_TABLESAMPLE_REPEAT"] = "2202G";
    /** Class 22 - Data Exception: [E] invalid_time_zone_displacement_value */
    POSTGRESQL_ERROR["INVALID_TIME_ZONE_DISPLACEMENT_VALUE"] = "22009";
    /** Class 22 - Data Exception: [E] invalid_use_of_escape_character */
    POSTGRESQL_ERROR["INVALID_USE_OF_ESCAPE_CHARACTER"] = "2200C";
    /** Class 22 - Data Exception: [E] most_specific_type_mismatch */
    POSTGRESQL_ERROR["MOST_SPECIFIC_TYPE_MISMATCH"] = "2200G";
    /** Class 22 - Data Exception: [E] null_value_not_allowed */
    POSTGRESQL_ERROR["NULL_VALUE_NOT_ALLOWED"] = "22004";
    /** Class 22 - Data Exception: [E] null_value_no_indicator_parameter */
    POSTGRESQL_ERROR["NULL_VALUE_NO_INDICATOR_PARAMETER"] = "22002";
    /** Class 22 - Data Exception: [E] numeric_value_out_of_range */
    POSTGRESQL_ERROR["NUMERIC_VALUE_OUT_OF_RANGE"] = "22003";
    /** Class 22 - Data Exception: [E] sequence_generator_limit_exceeded */
    POSTGRESQL_ERROR["SEQUENCE_GENERATOR_LIMIT_EXCEEDED"] = "2200H";
    /** Class 22 - Data Exception: [E] string_data_length_mismatch */
    POSTGRESQL_ERROR["STRING_DATA_LENGTH_MISMATCH"] = "22026";
    /** Class 22 - Data Exception: [E] string_data_right_truncation */
    POSTGRESQL_ERROR["STRING_DATA_RIGHT_TRUNCATION"] = "22001";
    /** Class 22 - Data Exception: [E] substring_error */
    POSTGRESQL_ERROR["SUBSTRING_ERROR"] = "22011";
    /** Class 22 - Data Exception: [E] trim_error */
    POSTGRESQL_ERROR["TRIM_ERROR"] = "22027";
    /** Class 22 - Data Exception: [E] unterminated_c_string */
    POSTGRESQL_ERROR["UNTERMINATED_C_STRING"] = "22024";
    /** Class 22 - Data Exception: [E] zero_length_character_string */
    POSTGRESQL_ERROR["ZERO_LENGTH_CHARACTER_STRING"] = "2200F";
    /** Class 22 - Data Exception: [E] floating_point_exception */
    POSTGRESQL_ERROR["FLOATING_POINT_EXCEPTION"] = "22P01";
    /** Class 22 - Data Exception: [E] invalid_text_representation */
    POSTGRESQL_ERROR["INVALID_TEXT_REPRESENTATION"] = "22P02";
    /** Class 22 - Data Exception: [E] invalid_binary_representation */
    POSTGRESQL_ERROR["INVALID_BINARY_REPRESENTATION"] = "22P03";
    /** Class 22 - Data Exception: [E] bad_copy_file_format */
    POSTGRESQL_ERROR["BAD_COPY_FILE_FORMAT"] = "22P04";
    /** Class 22 - Data Exception: [E] untranslatable_character */
    POSTGRESQL_ERROR["UNTRANSLATABLE_CHARACTER"] = "22P05";
    /** Class 22 - Data Exception: [E] not_an_xml_document */
    POSTGRESQL_ERROR["NOT_AN_XML_DOCUMENT"] = "2200L";
    /** Class 22 - Data Exception: [E] invalid_xml_document */
    POSTGRESQL_ERROR["INVALID_XML_DOCUMENT"] = "2200M";
    /** Class 22 - Data Exception: [E] invalid_xml_content */
    POSTGRESQL_ERROR["INVALID_XML_CONTENT"] = "2200N";
    /** Class 22 - Data Exception: [E] invalid_xml_comment */
    POSTGRESQL_ERROR["INVALID_XML_COMMENT"] = "2200S";
    /** Class 22 - Data Exception: [E] invalid_xml_processing_instruction */
    POSTGRESQL_ERROR["INVALID_XML_PROCESSING_INSTRUCTION"] = "2200T";
    /** Class 22 - Data Exception: [E] duplicate_json_object_key_value */
    POSTGRESQL_ERROR["DUPLICATE_JSON_OBJECT_KEY_VALUE"] = "22030";
    /** Class 22 - Data Exception: [E] invalid_argument_for_sql_json_datetime_function */
    POSTGRESQL_ERROR["INVALID_ARGUMENT_FOR_SQL_JSON_DATETIME_FUNCTION"] = "22031";
    /** Class 22 - Data Exception: [E] invalid_json_text */
    POSTGRESQL_ERROR["INVALID_JSON_TEXT"] = "22032";
    /** Class 22 - Data Exception: [E] invalid_sql_json_subscript */
    POSTGRESQL_ERROR["INVALID_SQL_JSON_SUBSCRIPT"] = "22033";
    /** Class 22 - Data Exception: [E] more_than_one_sql_json_item */
    POSTGRESQL_ERROR["MORE_THAN_ONE_SQL_JSON_ITEM"] = "22034";
    /** Class 22 - Data Exception: [E] no_sql_json_item */
    POSTGRESQL_ERROR["NO_SQL_JSON_ITEM"] = "22035";
    /** Class 22 - Data Exception: [E] non_numeric_sql_json_item */
    POSTGRESQL_ERROR["NON_NUMERIC_SQL_JSON_ITEM"] = "22036";
    /** Class 22 - Data Exception: [E] non_unique_keys_in_a_json_object */
    POSTGRESQL_ERROR["NON_UNIQUE_KEYS_IN_A_JSON_OBJECT"] = "22037";
    /** Class 22 - Data Exception: [E] singleton_sql_json_item_required */
    POSTGRESQL_ERROR["SINGLETON_SQL_JSON_ITEM_REQUIRED"] = "22038";
    /** Class 22 - Data Exception: [E] sql_json_array_not_found */
    POSTGRESQL_ERROR["SQL_JSON_ARRAY_NOT_FOUND"] = "22039";
    /** Class 22 - Data Exception: [E] sql_json_member_not_found */
    POSTGRESQL_ERROR["SQL_JSON_MEMBER_NOT_FOUND"] = "2203A";
    /** Class 22 - Data Exception: [E] sql_json_number_not_found */
    POSTGRESQL_ERROR["SQL_JSON_NUMBER_NOT_FOUND"] = "2203B";
    /** Class 22 - Data Exception: [E] sql_json_object_not_found */
    POSTGRESQL_ERROR["SQL_JSON_OBJECT_NOT_FOUND"] = "2203C";
    /** Class 22 - Data Exception: [E] too_many_json_array_elements */
    POSTGRESQL_ERROR["TOO_MANY_JSON_ARRAY_ELEMENTS"] = "2203D";
    /** Class 22 - Data Exception: [E] too_many_json_object_members */
    POSTGRESQL_ERROR["TOO_MANY_JSON_OBJECT_MEMBERS"] = "2203E";
    /** Class 22 - Data Exception: [E] sql_json_scalar_required */
    POSTGRESQL_ERROR["SQL_JSON_SCALAR_REQUIRED"] = "2203F";
    /** Class 23 - Integrity Constraint Violation: [E] integrity_constraint_violation */
    POSTGRESQL_ERROR["INTEGRITY_CONSTRAINT_VIOLATION"] = "23000";
    /** Class 23 - Integrity Constraint Violation: [E] restrict_violation */
    POSTGRESQL_ERROR["RESTRICT_VIOLATION"] = "23001";
    /** Class 23 - Integrity Constraint Violation: [E] not_null_violation */
    POSTGRESQL_ERROR["NOT_NULL_VIOLATION"] = "23502";
    /** Class 23 - Integrity Constraint Violation: [E] foreign_key_violation */
    POSTGRESQL_ERROR["FOREIGN_KEY_VIOLATION"] = "23503";
    /** Class 23 - Integrity Constraint Violation: [E] unique_violation */
    POSTGRESQL_ERROR["UNIQUE_VIOLATION"] = "23505";
    /** Class 23 - Integrity Constraint Violation: [E] check_violation */
    POSTGRESQL_ERROR["CHECK_VIOLATION"] = "23514";
    /** Class 23 - Integrity Constraint Violation: [E] exclusion_violation */
    POSTGRESQL_ERROR["EXCLUSION_VIOLATION"] = "23P01";
    /** Class 24 - Invalid Cursor State: [E] invalid_cursor_state */
    POSTGRESQL_ERROR["INVALID_CURSOR_STATE"] = "24000";
    /** Class 25 - Invalid Transaction State: [E] invalid_transaction_state */
    POSTGRESQL_ERROR["INVALID_TRANSACTION_STATE"] = "25000";
    /** Class 25 - Invalid Transaction State: [E] active_sql_transaction */
    POSTGRESQL_ERROR["ACTIVE_SQL_TRANSACTION"] = "25001";
    /** Class 25 - Invalid Transaction State: [E] branch_transaction_already_active */
    POSTGRESQL_ERROR["BRANCH_TRANSACTION_ALREADY_ACTIVE"] = "25002";
    /** Class 25 - Invalid Transaction State: [E] held_cursor_requires_same_isolation_level */
    POSTGRESQL_ERROR["HELD_CURSOR_REQUIRES_SAME_ISOLATION_LEVEL"] = "25008";
    /** Class 25 - Invalid Transaction State: [E] inappropriate_access_mode_for_branch_transaction */
    POSTGRESQL_ERROR["INAPPROPRIATE_ACCESS_MODE_FOR_BRANCH_TRANSACTION"] = "25003";
    /** Class 25 - Invalid Transaction State: [E] inappropriate_isolation_level_for_branch_transaction */
    POSTGRESQL_ERROR["INAPPROPRIATE_ISOLATION_LEVEL_FOR_BRANCH_TRANSACTION"] = "25004";
    /** Class 25 - Invalid Transaction State: [E] no_active_sql_transaction_for_branch_transaction */
    POSTGRESQL_ERROR["NO_ACTIVE_SQL_TRANSACTION_FOR_BRANCH_TRANSACTION"] = "25005";
    /** Class 25 - Invalid Transaction State: [E] read_only_sql_transaction */
    POSTGRESQL_ERROR["READ_ONLY_SQL_TRANSACTION"] = "25006";
    /** Class 25 - Invalid Transaction State: [E] schema_and_data_statement_mixing_not_supported */
    POSTGRESQL_ERROR["SCHEMA_AND_DATA_STATEMENT_MIXING_NOT_SUPPORTED"] = "25007";
    /** Class 25 - Invalid Transaction State: [E] no_active_sql_transaction */
    POSTGRESQL_ERROR["NO_ACTIVE_SQL_TRANSACTION"] = "25P01";
    /** Class 25 - Invalid Transaction State: [E] in_failed_sql_transaction */
    POSTGRESQL_ERROR["IN_FAILED_SQL_TRANSACTION"] = "25P02";
    /** Class 25 - Invalid Transaction State: [E] idle_in_transaction_session_timeout */
    POSTGRESQL_ERROR["IDLE_IN_TRANSACTION_SESSION_TIMEOUT"] = "25P03";
    /** Class 26 - Invalid SQL Statement Name: [E] invalid_sql_statement_name */
    POSTGRESQL_ERROR["INVALID_SQL_STATEMENT_NAME"] = "26000";
    /** Class 27 - Triggered Data Change Violation: [E] triggered_data_change_violation */
    POSTGRESQL_ERROR["TRIGGERED_DATA_CHANGE_VIOLATION"] = "27000";
    /** Class 28 - Invalid Authorization Specification: [E] invalid_authorization_specification */
    POSTGRESQL_ERROR["INVALID_AUTHORIZATION_SPECIFICATION"] = "28000";
    /** Class 28 - Invalid Authorization Specification: [E] invalid_password */
    POSTGRESQL_ERROR["INVALID_PASSWORD"] = "28P01";
    /** Class 2B - Dependent Privilege Descriptors Still Exist: [E] dependent_privilege_descriptors_still_exist */
    POSTGRESQL_ERROR["DEPENDENT_PRIVILEGE_DESCRIPTORS_STILL_EXIST"] = "2B000";
    /** Class 2B - Dependent Privilege Descriptors Still Exist: [E] dependent_objects_still_exist */
    POSTGRESQL_ERROR["DEPENDENT_OBJECTS_STILL_EXIST"] = "2BP01";
    /** Class 2D - Invalid Transaction Termination: [E] invalid_transaction_termination */
    POSTGRESQL_ERROR["INVALID_TRANSACTION_TERMINATION"] = "2D000";
    /** Class 2F - SQL Routine Exception: [E] sql_routine_exception */
    POSTGRESQL_ERROR["SQL_ROUTINE_EXCEPTION"] = "2F000";
    /** Class 2F - SQL Routine Exception: [E] function_executed_no_return_statement */
    POSTGRESQL_ERROR["S_R_E_FUNCTION_EXECUTED_NO_RETURN_STATEMENT"] = "2F005";
    /** Class 2F - SQL Routine Exception: [E] modifying_sql_data_not_permitted */
    POSTGRESQL_ERROR["S_R_E_MODIFYING_SQL_DATA_NOT_PERMITTED"] = "2F002";
    /** Class 2F - SQL Routine Exception: [E] prohibited_sql_statement_attempted */
    POSTGRESQL_ERROR["S_R_E_PROHIBITED_SQL_STATEMENT_ATTEMPTED"] = "2F003";
    /** Class 2F - SQL Routine Exception: [E] reading_sql_data_not_permitted */
    POSTGRESQL_ERROR["S_R_E_READING_SQL_DATA_NOT_PERMITTED"] = "2F004";
    /** Class 34 - Invalid Cursor Name: [E] invalid_cursor_name */
    POSTGRESQL_ERROR["INVALID_CURSOR_NAME"] = "34000";
    /** Class 38 - External Routine Exception: [E] external_routine_exception */
    POSTGRESQL_ERROR["EXTERNAL_ROUTINE_EXCEPTION"] = "38000";
    /** Class 38 - External Routine Exception: [E] containing_sql_not_permitted */
    POSTGRESQL_ERROR["E_R_E_CONTAINING_SQL_NOT_PERMITTED"] = "38001";
    /** Class 38 - External Routine Exception: [E] modifying_sql_data_not_permitted */
    POSTGRESQL_ERROR["E_R_E_MODIFYING_SQL_DATA_NOT_PERMITTED"] = "38002";
    /** Class 38 - External Routine Exception: [E] prohibited_sql_statement_attempted */
    POSTGRESQL_ERROR["E_R_E_PROHIBITED_SQL_STATEMENT_ATTEMPTED"] = "38003";
    /** Class 38 - External Routine Exception: [E] reading_sql_data_not_permitted */
    POSTGRESQL_ERROR["E_R_E_READING_SQL_DATA_NOT_PERMITTED"] = "38004";
    /** Class 39 - External Routine Invocation Exception: [E] external_routine_invocation_exception */
    POSTGRESQL_ERROR["EXTERNAL_ROUTINE_INVOCATION_EXCEPTION"] = "39000";
    /** Class 39 - External Routine Invocation Exception: [E] invalid_sqlstate_returned */
    POSTGRESQL_ERROR["E_R_I_E_INVALID_SQLSTATE_RETURNED"] = "39001";
    /** Class 39 - External Routine Invocation Exception: [E] null_value_not_allowed */
    POSTGRESQL_ERROR["E_R_I_E_NULL_VALUE_NOT_ALLOWED"] = "39004";
    /** Class 39 - External Routine Invocation Exception: [E] trigger_protocol_violated */
    POSTGRESQL_ERROR["E_R_I_E_TRIGGER_PROTOCOL_VIOLATED"] = "39P01";
    /** Class 39 - External Routine Invocation Exception: [E] srf_protocol_violated */
    POSTGRESQL_ERROR["E_R_I_E_SRF_PROTOCOL_VIOLATED"] = "39P02";
    /** Class 39 - External Routine Invocation Exception: [E] event_trigger_protocol_violated */
    POSTGRESQL_ERROR["E_R_I_E_EVENT_TRIGGER_PROTOCOL_VIOLATED"] = "39P03";
    /** Class 3B - Savepoint Exception: [E] savepoint_exception */
    POSTGRESQL_ERROR["SAVEPOINT_EXCEPTION"] = "3B000";
    /** Class 3B - Savepoint Exception: [E] invalid_savepoint_specification */
    POSTGRESQL_ERROR["S_E_INVALID_SPECIFICATION"] = "3B001";
    /** Class 3D - Invalid Catalog Name: [E] invalid_catalog_name */
    POSTGRESQL_ERROR["INVALID_CATALOG_NAME"] = "3D000";
    /** Class 3F - Invalid Schema Name: [E] invalid_schema_name */
    POSTGRESQL_ERROR["INVALID_SCHEMA_NAME"] = "3F000";
    /** Class 40 - Transaction Rollback: [E] transaction_rollback */
    POSTGRESQL_ERROR["TRANSACTION_ROLLBACK"] = "40000";
    /** Class 40 - Transaction Rollback: [E] transaction_integrity_constraint_violation */
    POSTGRESQL_ERROR["T_R_INTEGRITY_CONSTRAINT_VIOLATION"] = "40002";
    /** Class 40 - Transaction Rollback: [E] serialization_failure */
    POSTGRESQL_ERROR["T_R_SERIALIZATION_FAILURE"] = "40001";
    /** Class 40 - Transaction Rollback: [E] statement_completion_unknown */
    POSTGRESQL_ERROR["T_R_STATEMENT_COMPLETION_UNKNOWN"] = "40003";
    /** Class 40 - Transaction Rollback: [E] deadlock_detected */
    POSTGRESQL_ERROR["T_R_DEADLOCK_DETECTED"] = "40P01";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] syntax_error_or_access_rule_violation */
    POSTGRESQL_ERROR["SYNTAX_ERROR_OR_ACCESS_RULE_VIOLATION"] = "42000";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] syntax_error */
    POSTGRESQL_ERROR["SYNTAX_ERROR"] = "42601";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] insufficient_privilege */
    POSTGRESQL_ERROR["INSUFFICIENT_PRIVILEGE"] = "42501";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] cannot_coerce */
    POSTGRESQL_ERROR["CANNOT_COERCE"] = "42846";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] grouping_error */
    POSTGRESQL_ERROR["GROUPING_ERROR"] = "42803";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] windowing_error */
    POSTGRESQL_ERROR["WINDOWING_ERROR"] = "42P20";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] invalid_recursion */
    POSTGRESQL_ERROR["INVALID_RECURSION"] = "42P19";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] invalid_foreign_key */
    POSTGRESQL_ERROR["INVALID_FOREIGN_KEY"] = "42830";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] invalid_name */
    POSTGRESQL_ERROR["INVALID_NAME"] = "42602";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] name_too_long */
    POSTGRESQL_ERROR["NAME_TOO_LONG"] = "42622";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] reserved_name */
    POSTGRESQL_ERROR["RESERVED_NAME"] = "42939";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] datatype_mismatch */
    POSTGRESQL_ERROR["DATATYPE_MISMATCH"] = "42804";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] indeterminate_datatype */
    POSTGRESQL_ERROR["INDETERMINATE_DATATYPE"] = "42P18";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] collation_mismatch */
    POSTGRESQL_ERROR["COLLATION_MISMATCH"] = "42P21";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] indeterminate_collation */
    POSTGRESQL_ERROR["INDETERMINATE_COLLATION"] = "42P22";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] wrong_object_type */
    POSTGRESQL_ERROR["WRONG_OBJECT_TYPE"] = "42809";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] generated_always */
    POSTGRESQL_ERROR["GENERATED_ALWAYS"] = "428C9";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] undefined_column */
    POSTGRESQL_ERROR["UNDEFINED_COLUMN"] = "42703";
    /** Class 42 - Syntax Error or Access Rule Violation: [E]  */
    POSTGRESQL_ERROR["UNDEFINED_CURSOR"] = "34000";
    /** Class 42 - Syntax Error or Access Rule Violation: [E]  */
    POSTGRESQL_ERROR["UNDEFINED_DATABASE"] = "3D000";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] undefined_function */
    POSTGRESQL_ERROR["UNDEFINED_FUNCTION"] = "42883";
    /** Class 42 - Syntax Error or Access Rule Violation: [E]  */
    POSTGRESQL_ERROR["UNDEFINED_PSTATEMENT"] = "26000";
    /** Class 42 - Syntax Error or Access Rule Violation: [E]  */
    POSTGRESQL_ERROR["UNDEFINED_SCHEMA"] = "3F000";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] undefined_table */
    POSTGRESQL_ERROR["UNDEFINED_TABLE"] = "42P01";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] undefined_parameter */
    POSTGRESQL_ERROR["UNDEFINED_PARAMETER"] = "42P02";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] undefined_object */
    POSTGRESQL_ERROR["UNDEFINED_OBJECT"] = "42704";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] duplicate_column */
    POSTGRESQL_ERROR["DUPLICATE_COLUMN"] = "42701";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] duplicate_cursor */
    POSTGRESQL_ERROR["DUPLICATE_CURSOR"] = "42P03";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] duplicate_database */
    POSTGRESQL_ERROR["DUPLICATE_DATABASE"] = "42P04";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] duplicate_function */
    POSTGRESQL_ERROR["DUPLICATE_FUNCTION"] = "42723";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] duplicate_prepared_statement */
    POSTGRESQL_ERROR["DUPLICATE_PSTATEMENT"] = "42P05";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] duplicate_schema */
    POSTGRESQL_ERROR["DUPLICATE_SCHEMA"] = "42P06";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] duplicate_table */
    POSTGRESQL_ERROR["DUPLICATE_TABLE"] = "42P07";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] duplicate_alias */
    POSTGRESQL_ERROR["DUPLICATE_ALIAS"] = "42712";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] duplicate_object */
    POSTGRESQL_ERROR["DUPLICATE_OBJECT"] = "42710";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] ambiguous_column */
    POSTGRESQL_ERROR["AMBIGUOUS_COLUMN"] = "42702";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] ambiguous_function */
    POSTGRESQL_ERROR["AMBIGUOUS_FUNCTION"] = "42725";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] ambiguous_parameter */
    POSTGRESQL_ERROR["AMBIGUOUS_PARAMETER"] = "42P08";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] ambiguous_alias */
    POSTGRESQL_ERROR["AMBIGUOUS_ALIAS"] = "42P09";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] invalid_column_reference */
    POSTGRESQL_ERROR["INVALID_COLUMN_REFERENCE"] = "42P10";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] invalid_column_definition */
    POSTGRESQL_ERROR["INVALID_COLUMN_DEFINITION"] = "42611";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] invalid_cursor_definition */
    POSTGRESQL_ERROR["INVALID_CURSOR_DEFINITION"] = "42P11";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] invalid_database_definition */
    POSTGRESQL_ERROR["INVALID_DATABASE_DEFINITION"] = "42P12";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] invalid_function_definition */
    POSTGRESQL_ERROR["INVALID_FUNCTION_DEFINITION"] = "42P13";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] invalid_prepared_statement_definition */
    POSTGRESQL_ERROR["INVALID_PSTATEMENT_DEFINITION"] = "42P14";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] invalid_schema_definition */
    POSTGRESQL_ERROR["INVALID_SCHEMA_DEFINITION"] = "42P15";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] invalid_table_definition */
    POSTGRESQL_ERROR["INVALID_TABLE_DEFINITION"] = "42P16";
    /** Class 42 - Syntax Error or Access Rule Violation: [E] invalid_object_definition */
    POSTGRESQL_ERROR["INVALID_OBJECT_DEFINITION"] = "42P17";
    /** Class 44 - WITH CHECK OPTION Violation: [E] with_check_option_violation */
    POSTGRESQL_ERROR["WITH_CHECK_OPTION_VIOLATION"] = "44000";
    /** Class 53 - Insufficient Resources: [E] insufficient_resources */
    POSTGRESQL_ERROR["INSUFFICIENT_RESOURCES"] = "53000";
    /** Class 53 - Insufficient Resources: [E] disk_full */
    POSTGRESQL_ERROR["DISK_FULL"] = "53100";
    /** Class 53 - Insufficient Resources: [E] out_of_memory */
    POSTGRESQL_ERROR["OUT_OF_MEMORY"] = "53200";
    /** Class 53 - Insufficient Resources: [E] too_many_connections */
    POSTGRESQL_ERROR["TOO_MANY_CONNECTIONS"] = "53300";
    /** Class 53 - Insufficient Resources: [E] configuration_limit_exceeded */
    POSTGRESQL_ERROR["CONFIGURATION_LIMIT_EXCEEDED"] = "53400";
    /** Class 54 - Program Limit Exceeded: [E] program_limit_exceeded */
    POSTGRESQL_ERROR["PROGRAM_LIMIT_EXCEEDED"] = "54000";
    /** Class 54 - Program Limit Exceeded: [E] statement_too_complex */
    POSTGRESQL_ERROR["STATEMENT_TOO_COMPLEX"] = "54001";
    /** Class 54 - Program Limit Exceeded: [E] too_many_columns */
    POSTGRESQL_ERROR["TOO_MANY_COLUMNS"] = "54011";
    /** Class 54 - Program Limit Exceeded: [E] too_many_arguments */
    POSTGRESQL_ERROR["TOO_MANY_ARGUMENTS"] = "54023";
    /** Class 55 - Object Not In Prerequisite State: [E] object_not_in_prerequisite_state */
    POSTGRESQL_ERROR["OBJECT_NOT_IN_PREREQUISITE_STATE"] = "55000";
    /** Class 55 - Object Not In Prerequisite State: [E] object_in_use */
    POSTGRESQL_ERROR["OBJECT_IN_USE"] = "55006";
    /** Class 55 - Object Not In Prerequisite State: [E] cant_change_runtime_param */
    POSTGRESQL_ERROR["CANT_CHANGE_RUNTIME_PARAM"] = "55P02";
    /** Class 55 - Object Not In Prerequisite State: [E] lock_not_available */
    POSTGRESQL_ERROR["LOCK_NOT_AVAILABLE"] = "55P03";
    /** Class 55 - Object Not In Prerequisite State: [E] unsafe_new_enum_value_usage */
    POSTGRESQL_ERROR["UNSAFE_NEW_ENUM_VALUE_USAGE"] = "55P04";
    /** Class 57 - Operator Intervention: [E] operator_intervention */
    POSTGRESQL_ERROR["OPERATOR_INTERVENTION"] = "57000";
    /** Class 57 - Operator Intervention: [E] query_canceled */
    POSTGRESQL_ERROR["QUERY_CANCELED"] = "57014";
    /** Class 57 - Operator Intervention: [E] admin_shutdown */
    POSTGRESQL_ERROR["ADMIN_SHUTDOWN"] = "57P01";
    /** Class 57 - Operator Intervention: [E] crash_shutdown */
    POSTGRESQL_ERROR["CRASH_SHUTDOWN"] = "57P02";
    /** Class 57 - Operator Intervention: [E] cannot_connect_now */
    POSTGRESQL_ERROR["CANNOT_CONNECT_NOW"] = "57P03";
    /** Class 57 - Operator Intervention: [E] database_dropped */
    POSTGRESQL_ERROR["DATABASE_DROPPED"] = "57P04";
    /** Class 57 - Operator Intervention: [E] idle_session_timeout */
    POSTGRESQL_ERROR["IDLE_SESSION_TIMEOUT"] = "57P05";
    /** Class 58 - System Error (errors external to PostgreSQL itself): [E] system_error */
    POSTGRESQL_ERROR["SYSTEM_ERROR"] = "58000";
    /** Class 58 - System Error (errors external to PostgreSQL itself): [E] io_error */
    POSTGRESQL_ERROR["IO_ERROR"] = "58030";
    /** Class 58 - System Error (errors external to PostgreSQL itself): [E] undefined_file */
    POSTGRESQL_ERROR["UNDEFINED_FILE"] = "58P01";
    /** Class 58 - System Error (errors external to PostgreSQL itself): [E] duplicate_file */
    POSTGRESQL_ERROR["DUPLICATE_FILE"] = "58P02";
    /** Class 72 - Snapshot Failure: [E] snapshot_too_old */
    POSTGRESQL_ERROR["SNAPSHOT_TOO_OLD"] = "72000";
    /** Class F0 - Configuration File Error: [E] config_file_error */
    POSTGRESQL_ERROR["CONFIG_FILE_ERROR"] = "F0000";
    /** Class F0 - Configuration File Error: [E] lock_file_exists */
    POSTGRESQL_ERROR["LOCK_FILE_EXISTS"] = "F0001";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_error */
    POSTGRESQL_ERROR["FDW_ERROR"] = "HV000";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_column_name_not_found */
    POSTGRESQL_ERROR["FDW_COLUMN_NAME_NOT_FOUND"] = "HV005";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_dynamic_parameter_value_needed */
    POSTGRESQL_ERROR["FDW_DYNAMIC_PARAMETER_VALUE_NEEDED"] = "HV002";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_function_sequence_error */
    POSTGRESQL_ERROR["FDW_FUNCTION_SEQUENCE_ERROR"] = "HV010";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_inconsistent_descriptor_information */
    POSTGRESQL_ERROR["FDW_INCONSISTENT_DESCRIPTOR_INFORMATION"] = "HV021";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_invalid_attribute_value */
    POSTGRESQL_ERROR["FDW_INVALID_ATTRIBUTE_VALUE"] = "HV024";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_invalid_column_name */
    POSTGRESQL_ERROR["FDW_INVALID_COLUMN_NAME"] = "HV007";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_invalid_column_number */
    POSTGRESQL_ERROR["FDW_INVALID_COLUMN_NUMBER"] = "HV008";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_invalid_data_type */
    POSTGRESQL_ERROR["FDW_INVALID_DATA_TYPE"] = "HV004";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_invalid_data_type_descriptors */
    POSTGRESQL_ERROR["FDW_INVALID_DATA_TYPE_DESCRIPTORS"] = "HV006";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_invalid_descriptor_field_identifier */
    POSTGRESQL_ERROR["FDW_INVALID_DESCRIPTOR_FIELD_IDENTIFIER"] = "HV091";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_invalid_handle */
    POSTGRESQL_ERROR["FDW_INVALID_HANDLE"] = "HV00B";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_invalid_option_index */
    POSTGRESQL_ERROR["FDW_INVALID_OPTION_INDEX"] = "HV00C";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_invalid_option_name */
    POSTGRESQL_ERROR["FDW_INVALID_OPTION_NAME"] = "HV00D";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_invalid_string_length_or_buffer_length */
    POSTGRESQL_ERROR["FDW_INVALID_STRING_LENGTH_OR_BUFFER_LENGTH"] = "HV090";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_invalid_string_format */
    POSTGRESQL_ERROR["FDW_INVALID_STRING_FORMAT"] = "HV00A";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_invalid_use_of_null_pointer */
    POSTGRESQL_ERROR["FDW_INVALID_USE_OF_NULL_POINTER"] = "HV009";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_too_many_handles */
    POSTGRESQL_ERROR["FDW_TOO_MANY_HANDLES"] = "HV014";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_out_of_memory */
    POSTGRESQL_ERROR["FDW_OUT_OF_MEMORY"] = "HV001";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_no_schemas */
    POSTGRESQL_ERROR["FDW_NO_SCHEMAS"] = "HV00P";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_option_name_not_found */
    POSTGRESQL_ERROR["FDW_OPTION_NAME_NOT_FOUND"] = "HV00J";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_reply_handle */
    POSTGRESQL_ERROR["FDW_REPLY_HANDLE"] = "HV00K";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_schema_not_found */
    POSTGRESQL_ERROR["FDW_SCHEMA_NOT_FOUND"] = "HV00Q";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_table_not_found */
    POSTGRESQL_ERROR["FDW_TABLE_NOT_FOUND"] = "HV00R";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_unable_to_create_execution */
    POSTGRESQL_ERROR["FDW_UNABLE_TO_CREATE_EXECUTION"] = "HV00L";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_unable_to_create_reply */
    POSTGRESQL_ERROR["FDW_UNABLE_TO_CREATE_REPLY"] = "HV00M";
    /** Class HV - Foreign Data Wrapper Error (SQL/MED): [E] fdw_unable_to_establish_connection */
    POSTGRESQL_ERROR["FDW_UNABLE_TO_ESTABLISH_CONNECTION"] = "HV00N";
    /** Class P0 - PL/pgSQL Error: [E] plpgsql_error */
    POSTGRESQL_ERROR["PLPGSQL_ERROR"] = "P0000";
    /** Class P0 - PL/pgSQL Error: [E] raise_exception */
    POSTGRESQL_ERROR["RAISE_EXCEPTION"] = "P0001";
    /** Class P0 - PL/pgSQL Error: [E] no_data_found */
    POSTGRESQL_ERROR["NO_DATA_FOUND"] = "P0002";
    /** Class P0 - PL/pgSQL Error: [E] too_many_rows */
    POSTGRESQL_ERROR["TOO_MANY_ROWS"] = "P0003";
    /** Class P0 - PL/pgSQL Error: [E] assert_failure */
    POSTGRESQL_ERROR["ASSERT_FAILURE"] = "P0004";
    /** Class XX - Internal Error: [E] internal_error */
    POSTGRESQL_ERROR["INTERNAL_ERROR"] = "XX000";
    /** Class XX - Internal Error: [E] data_corrupted */
    POSTGRESQL_ERROR["DATA_CORRUPTED"] = "XX001";
    /** Class XX - Internal Error: [E] index_corrupted */
    POSTGRESQL_ERROR["INDEX_CORRUPTED"] = "XX002";
})(POSTGRESQL_ERROR = exports.POSTGRESQL_ERROR || (exports.POSTGRESQL_ERROR = {}));
