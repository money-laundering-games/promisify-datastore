const DataStoreService = game.GetService("DataStoreService");

interface DataStoreAsync {
	/**
	 * This function retrieves the specified key version as well as a [DataStoreKeyInfo](https://developer.roblox.com/en-us/api-reference/class/DataStoreKeyInfo) instance. A version identifier can be found through [DataStore:ListVersionsAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/ListVersionsAsync) or alternatively be the identifier returned by [GlobalDataStore:SetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/SetAsync).
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 *
	 * Tags: Yields
	 */
	GetVersionAsync(key: string, version: string): Promise<LuaTuple<[value: unknown, keyInfo: DataStoreKeyInfo]>>;
	/**
	 * This function returns a [DataStoreKeyPages](https://developer.roblox.com/en-us/api-reference/class/DataStoreKeyPages) object for enumerating through keys of a data store. It accepts an optional `prefix` parameter to only locate keys whose names start with the provided prefix.
	 *
	 * If [DataStoreOptions.AllScopes](https://developer.roblox.com/en-us/api-reference/property/DataStoreOptions/AllScopes) was set to true when accessing the data store through [DataStoreService:GetDataStore](https://developer.roblox.com/en-us/api-reference/function/DataStoreService/GetDataStore), keys will be returned with all scopes as prefixes.
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 *
	 * Tags: Yields
	 */
	ListKeysAsync(
		prefix?: string,
		pageSize?: number,
		cursor?: string,
		excludeDeleted?: boolean,
	): Promise<DataStoreKeyPages>;
	/**
	 * This function enumerates versions of the specified key in either ascending or descending order specified by a [SortDirection](https://developer.roblox.com/en-us/api-reference/enum/SortDirection) parameter. It can optionally filter the returned versions by minimum and maximum timestamp.
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, and more.
	 *
	 * Tags: Yields
	 */
	ListVersionsAsync(
		key: string,
		sortDirection?: CastsToEnum<Enum.SortDirection>,
		minDate?: number,
		maxDate?: number,
		pageSize?: number,
	): Promise<DataStoreVersionPages>;
	/**
	 * This function permanently deletes the specified version of a key. Version identifiers can be found through [DataStore:ListVersionsAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/ListVersionsAsync).
	 *
	 * Unlike [GlobalDataStore:RemoveAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/RemoveAsync), this function does not create a new “tombstone” version and the removed value cannot be retrieved later.
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 *
	 * Tags: Yields
	 */
	RemoveVersionAsync(key: string, version: string): Promise<void>;
	/**
	 * This function sets **callback** as the function to be run any time the value associated with the [data store's](https://developer.roblox.com/en-us/api-reference/class/GlobalDataStore) key changes. Once every minute, OnUpdate polls for changes by other servers. Changes made on the same server will run the function immediately. In other words, functions like [IncrementAsync()](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/IncrementAsync), [SetAsync()](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/SetAsync), and [UpdateAsync()](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/UpdateAsync) change the key's value in the data store and will cause the function to run.
	 *
	 * See the [Data Stores](https://developer.roblox.com/en-us/articles/data-store) article for an in-depth guide on data structure, management, error handling, etc.
	 *
	 * It's recommended that you **disconnect** the connection when the subscription to the key is no longer needed.
	 * @deprecated
	 */
	OnUpdate(key: string, callback: Callback): RBXScriptConnection;
	/**
	 * This function returns the latest value of the provided key and a [DataStoreKeyInfo](https://developer.roblox.com/en-us/api-reference/class/DataStoreKeyInfo) instance. If the key does not exist or if the latest version has been marked as deleted, both return values will be `nil`.
	 *
	 * [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) does not support versioning and metadata, so [DataStoreKeyInfo](https://developer.roblox.com/en-us/api-reference/class/DataStoreKeyInfo) will always be `nil` for keys in an [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore).
	 *
	 * Keys are cached locally for 4 seconds after the first read. A [GlobalDataStore:GetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/GetAsync) call within these 4 seconds returns a value from the cache. Modifications to the key by [GlobalDataStore:SetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/SetAsync) or [GlobalDataStore:UpdateAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/UpdateAsync) apply to the cache immediately and restart the 4 second timer.
	 *
	 * To get a specific version, such as a version before the latest, use [DataStore:GetVersionAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/GetVersionAsync).
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 *
	 * Tags: Yields
	 */
	GetAsync(key: string, options?: DataStoreGetOptions): Promise<LuaTuple<[unknown, DataStoreKeyInfo]>>;
	/**
	 * This function increments the value of a key by the provided amount (both must be integers).
	 *
	 * [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) does not support versioning, so calling this method on an [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) key will overwrite the current value with the incremented value and make previous versions inaccessible.
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 *
	 * Tags: Yields
	 */
	IncrementAsync(
		key: string,
		delta?: number,
		options?: DataStoreIncrementOptions,
	): Promise<LuaTuple<[number, DataStoreKeyInfo]>>;
	/**
	 * This function marks the specified key as deleted by creating a new “tombstone” version of the key. Prior to this, it returns the latest version prior to the remove call.
	 *
	 * After a key is removed via this function, [GlobalDataStore:GetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/GetAsync) calls for the key will return `nil`. Older versions of the key remain accessible through [DataStore:ListVersionsAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/ListVersionsAsync) and [DataStore:GetVersionAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/GetVersionAsync), assuming they have not expired.
	 *
	 * [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) does not support versioning, so calling [RemoveAsync()](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/RemoveAsync) on an [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) key will permanently delete it.
	 *
	 * Removed objects will be deleted permanently after 30 days.
	 *
	 * If the previous values were already deleted via [GlobalDataStore:RemoveAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/RemoveAsync) or [DataStore:RemoveVersionAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/RemoveVersionAsync), the function will return `nil`, `nil` for value and [DataStoreKeyInfo](https://developer.roblox.com/en-us/api-reference/class/DataStoreKeyInfo) respectively.
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 *
	 * Tags: Yields
	 */
	RemoveAsync(key: string): Promise<LuaTuple<[unknown, DataStoreKeyInfo | undefined]>>;
	/**
	 * This function sets the latest value, [UserIds](https://developer.roblox.com/en-us/api-reference/property/Player/UserId), and metadata for the given key.
	 *
	 * Values in data stores are versioned, meaning [GlobalDataStore:SetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/SetAsync) will create a new version every time it is called. Prior versions can be accessed through [DataStore:ListVersionsAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/ListVersionsAsync)/[DataStore:GetVersionAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/GetVersionAsync) for up to 30 days at which point they are permanently deleted.
	 *
	 * [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) does not support versioning, so calling this method on an [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) key will overwrite the current value and make previous versions inaccessible.
	 *
	 * Metadata definitions must always be updated with a value, even if there are no changes to the current value; otherwise the current value will be lost.
	 *
	 * Any string being stored in a data store must be valid [UTF-8](https://developer.roblox.com/en-us/api-reference/class/Articles/Lua Libraries/utf8). In UTF-8, values greater than 127 are used exclusively for encoding multi-byte codepoints, so a single byte greater than 127 will not be valid UTF-8 and the [GlobalDataStore:SetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/SetAsync) attempt will fail.
	 *
	 * ##### Set vs. Update
	 *
	 * [GlobalDataStore:SetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/SetAsync) is best for a quick update of a specific key, and it only counts against the write limit. However, it may cause data inconsistency if two servers attempt to set the same key at the same time.
	 *
	 * [GlobalDataStore:UpdateAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/UpdateAsync) is safer for handling multi-server attempts because it reads the current key value (from whatever server last updated it) before making any changes. However, it's somewhat slower because it reads before it writes, and it also counts against both the read and write limit.
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 *
	 * Tags: Yields
	 */
	SetAsync(key: string, value?: unknown, userIds?: number[], options?: DataStoreSetOptions): Promise<string>;
	/**
	 * This function retrieves the value and metadata of a key from the data store and updates it with a new value determined by the callback function specified through the second parameter.
	 *
	 * If the update succeeds, a new version of the value will be created and prior versions will remain accessible through [DataStore:ListVersionsAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/ListVersionsAsync) and [DataStore:GetVersionAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/GetVersionAsync).
	 *
	 * [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) does not support versioning, so calling this function on an [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) key will overwrite the current value and make previous versions inaccessible.
	 *
	 * In cases where another game server updated the key in the short timespan between retrieving the key's current value and setting the key's value, [GlobalDataStore:UpdateAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/UpdateAsync) will call the function again to ensure that no data is overwritten. The function will be called as many times as needed until the data is saved **or** until the callback function returns `nil`.
	 *
	 * Any string being stored in a data store must be valid [UTF-8](https://developer.roblox.com/en-us/api-reference/class/Articles/Lua Libraries/utf8). In UTF-8, values greater than 127 are used exclusively for encoding multi-byte codepoints, so a single byte greater than 127 will not be valid UTF-8 and the [GlobalDataStore:UpdateAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/UpdateAsync) attempt will fail.
	 *
	 * ##### Set vs. Update
	 *
	 * [GlobalDataStore:SetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/SetAsync) is best for a quick update of a specific key, and it only counts against the write limit. However, it may cause data inconsistency if two servers attempt to set the same key at the same time.
	 *
	 * [GlobalDataStore:UpdateAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/UpdateAsync) is safer for handling multi-server attempts because it reads the current key value (from whatever server last updated it) before making any changes. However, it's somewhat slower because it reads before it writes, and it also counts against both the read and write limit.
	 *
	 * Callback Function
	 * -----------------
	 *
	 * The callback function accepts two arguments:
	 *
	 * *   Current value of the key prior to the update.
	 * *   [DataStoreKeyInfo](https://developer.roblox.com/en-us/api-reference/class/DataStoreKeyInfo) instance that contains the latest version information (this argument can be ignored if metadata is not being used).
	 *
	 * In turn, the callback function returns up to three values:
	 *
	 * *   The new value to set for the key.
	 * *   An array of [UserIds](https://developer.roblox.com/en-us/api-reference/property/Player/UserId) to associate with the key. [DataStoreKeyInfo:GetUserIds](https://developer.roblox.com/en-us/api-reference/function/DataStoreKeyInfo/GetUserIds) should be returned unless the existing IDs are being changed; otherwise all existing IDs will be cleared.
	 * *   A Lua table containing metadata to associate with the key. [DataStoreKeyInfo:GetMetadata](https://developer.roblox.com/en-us/api-reference/function/DataStoreKeyInfo/GetMetadata) should be returned unless the existing metadata is being changed; otherwise all existing metadata will be cleared.
	 *
	 * The callback function cannot yield, so do **not** include calls like `wait()`.
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 *
	 * Tags: Yields
	 */
	UpdateAsync(
		key: string,
		transformFunction: (oldValue: unknown) => LuaTuple<[newValue: unknown, userIds?: number[], metadata?: object]>,
	): Promise<LuaTuple<[newValue: unknown, keyInfo: DataStoreKeyInfo]>>;
}

interface GlobalDataStoreAsync {
	OnUpdate(key: string, callback: Callback): RBXScriptConnection;
	/**
	 * This function returns the latest value of the provided key and a [DataStoreKeyInfo](https://developer.roblox.com/en-us/api-reference/class/DataStoreKeyInfo) instance. If the key does not exist or if the latest version has been marked as deleted, both return values will be `nil`.
	 *
	 * [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) does not support versioning and metadata, so [DataStoreKeyInfo](https://developer.roblox.com/en-us/api-reference/class/DataStoreKeyInfo) will always be `nil` for keys in an [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore).
	 *
	 * Keys are cached locally for 4 seconds after the first read. A [GlobalDataStore:GetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/GetAsync) call within these 4 seconds returns a value from the cache. Modifications to the key by [GlobalDataStore:SetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/SetAsync) or [GlobalDataStore:UpdateAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/UpdateAsync) apply to the cache immediately and restart the 4 second timer.
	 *
	 * To get a specific version, such as a version before the latest, use [DataStore:GetVersionAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/GetVersionAsync).
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 *
	 * Tags: Yields
	 */
	GetAsync(key: string, options?: DataStoreGetOptions): Promise<LuaTuple<[unknown, DataStoreKeyInfo]>>;
	/**
	 * This function increments the value of a key by the provided amount (both must be integers).
	 *
	 * [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) does not support versioning, so calling this method on an [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) key will overwrite the current value with the incremented value and make previous versions inaccessible.
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 *
	 * Tags: Yields
	 */
	IncrementAsync(
		key: string,
		delta?: number,
		options?: DataStoreIncrementOptions,
	): Promise<LuaTuple<[number, DataStoreKeyInfo]>>;
	/**
	 * This function marks the specified key as deleted by creating a new “tombstone” version of the key. Prior to this, it returns the latest version prior to the remove call.
	 *
	 * After a key is removed via this function, [GlobalDataStore:GetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/GetAsync) calls for the key will return `nil`. Older versions of the key remain accessible through [DataStore:ListVersionsAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/ListVersionsAsync) and [DataStore:GetVersionAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/GetVersionAsync), assuming they have not expired.
	 *
	 * [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) does not support versioning, so calling [RemoveAsync()](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/RemoveAsync) on an [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) key will permanently delete it.
	 *
	 * Removed objects will be deleted permanently after 30 days.
	 *
	 * If the previous values were already deleted via [GlobalDataStore:RemoveAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/RemoveAsync) or [DataStore:RemoveVersionAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/RemoveVersionAsync), the function will return `nil`, `nil` for value and [DataStoreKeyInfo](https://developer.roblox.com/en-us/api-reference/class/DataStoreKeyInfo) respectively.
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 *
	 * Tags: Yields
	 */
	RemoveAsync(key: string): Promise<LuaTuple<[unknown, DataStoreKeyInfo | undefined]>>;
	/**
	 * This function sets the latest value, [UserIds](https://developer.roblox.com/en-us/api-reference/property/Player/UserId), and metadata for the given key.
	 *
	 * Values in data stores are versioned, meaning [GlobalDataStore:SetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/SetAsync) will create a new version every time it is called. Prior versions can be accessed through [DataStore:ListVersionsAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/ListVersionsAsync)/[DataStore:GetVersionAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/GetVersionAsync) for up to 30 days at which point they are permanently deleted.
	 *
	 * [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) does not support versioning, so calling this method on an [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) key will overwrite the current value and make previous versions inaccessible.
	 *
	 * Metadata definitions must always be updated with a value, even if there are no changes to the current value; otherwise the current value will be lost.
	 *
	 * Any string being stored in a data store must be valid [UTF-8](https://developer.roblox.com/en-us/api-reference/class/Articles/Lua Libraries/utf8). In UTF-8, values greater than 127 are used exclusively for encoding multi-byte codepoints, so a single byte greater than 127 will not be valid UTF-8 and the [GlobalDataStore:SetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/SetAsync) attempt will fail.
	 *
	 * ##### Set vs. Update
	 *
	 * [GlobalDataStore:SetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/SetAsync) is best for a quick update of a specific key, and it only counts against the write limit. However, it may cause data inconsistency if two servers attempt to set the same key at the same time.
	 *
	 * [GlobalDataStore:UpdateAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/UpdateAsync) is safer for handling multi-server attempts because it reads the current key value (from whatever server last updated it) before making any changes. However, it's somewhat slower because it reads before it writes, and it also counts against both the read and write limit.
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 *
	 * Tags: Yields
	 */
	SetAsync(key: string, value?: unknown, userIds?: number[], options?: DataStoreSetOptions): Promise<string>;
	/**
	 * This function retrieves the value and metadata of a key from the data store and updates it with a new value determined by the callback function specified through the second parameter.
	 *
	 * If the update succeeds, a new version of the value will be created and prior versions will remain accessible through [DataStore:ListVersionsAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/ListVersionsAsync) and [DataStore:GetVersionAsync](https://developer.roblox.com/en-us/api-reference/function/DataStore/GetVersionAsync).
	 *
	 * [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) does not support versioning, so calling this function on an [OrderedDataStore](https://developer.roblox.com/en-us/api-reference/class/OrderedDataStore) key will overwrite the current value and make previous versions inaccessible.
	 *
	 * In cases where another game server updated the key in the short timespan between retrieving the key's current value and setting the key's value, [GlobalDataStore:UpdateAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/UpdateAsync) will call the function again to ensure that no data is overwritten. The function will be called as many times as needed until the data is saved **or** until the callback function returns `nil`.
	 *
	 * Any string being stored in a data store must be valid [UTF-8](https://developer.roblox.com/en-us/api-reference/class/Articles/Lua Libraries/utf8). In UTF-8, values greater than 127 are used exclusively for encoding multi-byte codepoints, so a single byte greater than 127 will not be valid UTF-8 and the [GlobalDataStore:UpdateAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/UpdateAsync) attempt will fail.
	 *
	 * ##### Set vs. Update
	 *
	 * [GlobalDataStore:SetAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/SetAsync) is best for a quick update of a specific key, and it only counts against the write limit. However, it may cause data inconsistency if two servers attempt to set the same key at the same time.
	 *
	 * [GlobalDataStore:UpdateAsync](https://developer.roblox.com/en-us/api-reference/function/GlobalDataStore/UpdateAsync) is safer for handling multi-server attempts because it reads the current key value (from whatever server last updated it) before making any changes. However, it's somewhat slower because it reads before it writes, and it also counts against both the read and write limit.
	 *
	 * Callback Function
	 * -----------------
	 *
	 * The callback function accepts two arguments:
	 *
	 * *   Current value of the key prior to the update.
	 * *   [DataStoreKeyInfo](https://developer.roblox.com/en-us/api-reference/class/DataStoreKeyInfo) instance that contains the latest version information (this argument can be ignored if metadata is not being used).
	 *
	 * In turn, the callback function returns up to three values:
	 *
	 * *   The new value to set for the key.
	 * *   An array of [UserIds](https://developer.roblox.com/en-us/api-reference/property/Player/UserId) to associate with the key. [DataStoreKeyInfo:GetUserIds](https://developer.roblox.com/en-us/api-reference/function/DataStoreKeyInfo/GetUserIds) should be returned unless the existing IDs are being changed; otherwise all existing IDs will be cleared.
	 * *   A Lua table containing metadata to associate with the key. [DataStoreKeyInfo:GetMetadata](https://developer.roblox.com/en-us/api-reference/function/DataStoreKeyInfo/GetMetadata) should be returned unless the existing metadata is being changed; otherwise all existing metadata will be cleared.
	 *
	 * The callback function cannot yield, so do **not** include calls like `wait()`.
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 *
	 * Tags: Yields
	 */
	UpdateAsync(
		key: string,
		transformFunction: (oldValue: unknown) => LuaTuple<[newValue: unknown, userIds?: number[], metadata?: object]>,
	): Promise<LuaTuple<[newValue: unknown, keyInfo: DataStoreKeyInfo]>>;
}

const DataStoreServiceAsync = {
	/**
	 * This function creates a [DataStore](https://developer.roblox.com/en-us/api-reference/class/DataStore) instance with the provided name and scope. Subsequent calls to this method with the same name/scope will return the same object.
	 *
	 * Using the `scope` parameter will restrict operations to that scope by automatically prepending the scope to keys in all operations done on the data store. This function also accepts an optional [DataStoreOptions](https://developer.roblox.com/en-us/api-reference/class/DataStoreOptions) instance which includes options for enabling [AllScopes](https://developer.roblox.com/en-us/api-reference/property/DataStoreOptions/AllScopes). See [here](https://developer.roblox.com/articles/Data-store#scope) for details on scope.
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 */
	GetDataStore(name: string, scope?: string, options?: DataStoreOptions) {
		return this.promisify_store(DataStoreService.GetDataStore(name, scope, options));
	},
	/**
	 * This function returns the default [GlobalDataStore](https://developer.roblox.com/en-us/api-reference/class/GlobalDataStore). If you want to access a specific **named** data store instead, you should use the [GetDataStore()](https://developer.roblox.com/en-us/api-reference/function/DataStoreService/GetDataStore) function.
	 */
	GetGlobalDataStore() {
		return this.promisify_global(DataStoreService.GetGlobalDataStore());
	},
	/**
	 * Returns a [DataStoreListingPages](https://developer.roblox.com/en-us/api-reference/class/DataStoreListingPages) object for enumerating through all of the experience's data stores. It accepts an optional `prefix` parameter to only locate data stores whose names start with the provided prefix.
	 *
	 * Only data stores containing at least one object will be listed via this function.
	 *
	 * See Also
	 * --------
	 *
	 * *   [Data Stores](https://developer.roblox.com/en-us/articles/data-store), an in-depth guide on data structure, management, error handling, etc.
	 *
	 * Tags: Yields
	 */
	ListDataStoresAsync(prefix?: string, pageSize?: number, cursor?: string): Promise<DataStoreListingPages> {
		return new Promise((resolve, reject) => {
			const [success, data] = pcall(() => {
				return DataStoreService.ListDataStoresAsync(prefix, pageSize, cursor);
			});
			if (success === false) {
				reject(data);
			} else {
				resolve(data);
			}
		});
	},
	/**
	 * @hidden
	 */
	promisify_function(obj: unknown, func_name: string, ...args: unknown[]) {
		return new Promise((resolve, reject) => {
			const [success, data] = pcall(() => {
				return (obj as Map<string, Callback>).get(func_name)!(obj, ...args);
			});
			if (success === false) {
				reject(data);
			} else {
				resolve(data);
			}
		});
	},
	/**
	 * @hidden
	 */
	promisify_global(internal_store: GlobalDataStore): GlobalDataStoreAsync {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const this2 = this;
		const GlobalDataStoreAsync = {
			OnUpdate(key: string, callback: Callback): RBXScriptConnection {
				return internal_store.OnUpdate(key, callback);
			},
			GetAsync(key: string, options?: DataStoreGetOptions): Promise<LuaTuple<[unknown, DataStoreKeyInfo]>> {
				return new Promise((resolve, reject) => {
					this2
						.promisify_function(internal_store, "GetAsync", key, options)
						.then((...args) => {
							resolve(args as unknown as LuaTuple<[unknown, DataStoreKeyInfo]>);
						})
						.catch((...err) => {
							reject(err);
						});
				});
			},
			IncrementAsync(
				key: string,
				delta?: number,
				options?: DataStoreIncrementOptions,
			): Promise<LuaTuple<[number, DataStoreKeyInfo]>> {
				return new Promise((resolve, reject) => {
					this2
						.promisify_function(internal_store, "IncrementAsync", key, delta, options)
						.then((...args) => {
							resolve(args as unknown as LuaTuple<[number, DataStoreKeyInfo]>);
						})
						.catch((...err) => {
							reject(err);
						});
				});
			},
			RemoveAsync(key: string): Promise<LuaTuple<[unknown, DataStoreKeyInfo | undefined]>> {
				return new Promise((resolve, reject) => {
					this2
						.promisify_function(internal_store, "RemoveAsync", key)
						.then((...args) => {
							resolve(args as unknown as LuaTuple<[unknown, DataStoreKeyInfo | undefined]>);
						})
						.catch((...err) => {
							reject(err);
						});
				});
			},
			SetAsync(key: string, value?: unknown, userIds?: number[], options?: DataStoreSetOptions): Promise<string> {
				return new Promise((resolve, reject) => {
					this2
						.promisify_function(internal_store, "SetAsync", key, value, userIds, options)
						.then((...args) => {
							resolve(args as unknown as string);
						})
						.catch((...err) => {
							reject(err);
						});
				});
			},
			UpdateAsync(
				key: string,
				transformFunction: (
					oldValue: unknown,
				) => LuaTuple<[newValue: unknown, userIds?: number[], metadata?: object]>,
			): Promise<LuaTuple<[newValue: unknown, keyInfo: DataStoreKeyInfo]>> {
				return new Promise((resolve, reject) => {
					this2
						.promisify_function(internal_store, "UpdateAsync", key, transformFunction)
						.then((...args) => {
							resolve(args as unknown as LuaTuple<[newValue: unknown, keyInfo: DataStoreKeyInfo]>);
						})
						.catch((...err) => {
							reject(err);
						});
				});
			},
		};

		return GlobalDataStoreAsync;
	},
	/**
	 * @hidden
	 */
	promisify_store(internal_store: DataStore): DataStoreAsync {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const this2 = this;
		const DataStoreAsync = {
			GetVersionAsync(
				key: string,
				version: string,
			): Promise<LuaTuple<[value: unknown, keyInfo: DataStoreKeyInfo]>> {
				return new Promise((resolve, reject) => {
					this2
						.promisify_function(internal_store, "GetVersionAsync", key, version)
						.then((...args) => {
							resolve(args as unknown as LuaTuple<[value: unknown, keyInfo: DataStoreKeyInfo]>);
						})
						.catch((...err) => {
							reject(err);
						});
				});
			},
			ListKeysAsync(
				prefix?: string,
				pageSize?: number,
				cursor?: string,
				excludeDeleted?: boolean,
			): Promise<DataStoreKeyPages> {
				return new Promise((resolve, reject) => {
					this2
						.promisify_function(internal_store, "ListKeysAsync", prefix, pageSize, cursor, excludeDeleted)
						.then((...args) => {
							resolve(args as unknown as DataStoreKeyPages);
						})
						.catch((...err) => {
							reject(err);
						});
				});
			},
			ListVersionsAsync(
				key: string,
				sortDirection?: CastsToEnum<Enum.SortDirection>,
				minDate?: number,
				maxDate?: number,
				pageSize?: number,
			): Promise<DataStoreVersionPages> {
				return new Promise((resolve, reject) => {
					this2
						.promisify_function(
							internal_store,
							"ListVersionsAsync",
							key,
							sortDirection,
							minDate,
							maxDate,
							pageSize,
						)
						.then((...args) => {
							resolve(args as unknown as DataStoreVersionPages);
						})
						.catch((...err) => {
							reject(err);
						});
				});
			},
			RemoveVersionAsync(key: string, version: string): Promise<void> {
				return new Promise((resolve, reject) => {
					this2
						.promisify_function(internal_store, "RemoveVersionAsync", key, version)
						.then((...args) => {
							resolve(args as unknown as void);
						})
						.catch((...err) => {
							reject(err);
						});
				});
			},
			OnUpdate(key: string, callback: Callback): RBXScriptConnection {
				return internal_store.OnUpdate(key, callback);
			},
			GetAsync(key: string, options?: DataStoreGetOptions): Promise<LuaTuple<[unknown, DataStoreKeyInfo]>> {
				return new Promise((resolve, reject) => {
					this2
						.promisify_function(internal_store, "GetAsync", key, options)
						.then((...args) => {
							resolve(args as unknown as LuaTuple<[unknown, DataStoreKeyInfo]>);
						})
						.catch((...err) => {
							reject(err);
						});
				});
			},
			IncrementAsync(
				key: string,
				delta?: number,
				options?: DataStoreIncrementOptions,
			): Promise<LuaTuple<[number, DataStoreKeyInfo]>> {
				return new Promise((resolve, reject) => {
					this2
						.promisify_function(internal_store, "IncrementAsync", key, delta, options)
						.then((...args) => {
							resolve(args as unknown as LuaTuple<[number, DataStoreKeyInfo]>);
						})
						.catch((...err) => {
							reject(err);
						});
				});
			},
			RemoveAsync(key: string): Promise<LuaTuple<[unknown, DataStoreKeyInfo | undefined]>> {
				return new Promise((resolve, reject) => {
					this2
						.promisify_function(internal_store, "RemoveAsync", key)
						.then((...args) => {
							resolve(args as unknown as LuaTuple<[unknown, DataStoreKeyInfo | undefined]>);
						})
						.catch((...err) => {
							reject(err);
						});
				});
			},
			SetAsync(key: string, value?: unknown, userIds?: number[], options?: DataStoreSetOptions): Promise<string> {
				return new Promise((resolve, reject) => {
					this2
						.promisify_function(internal_store, "SetAsync", key, value, userIds, options)
						.then((...args) => {
							resolve(args as unknown as string);
						})
						.catch((...err) => {
							reject(err);
						});
				});
			},
			UpdateAsync(
				key: string,
				transformFunction: (
					oldValue: unknown,
				) => LuaTuple<[newValue: unknown, userIds?: number[], metadata?: object]>,
			): Promise<LuaTuple<[newValue: unknown, keyInfo: DataStoreKeyInfo]>> {
				return new Promise((resolve, reject) => {
					this2
						.promisify_function(internal_store, "UpdateAsync", key, transformFunction)
						.then((...args) => {
							resolve(args as unknown as LuaTuple<[newValue: unknown, keyInfo: DataStoreKeyInfo]>);
						})
						.catch((...err) => {
							reject(err);
						});
				});
			},
		};

		return DataStoreAsync;
	},
};

export default DataStoreServiceAsync;
