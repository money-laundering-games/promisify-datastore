# datastore-promises

Promisifed DataStoreService. Currently does not support OrderedDataStore's (sorry!) or the Global DataStore (why are you using that anyways)

Same API as built-in DataStoreService. You can use this for reference: https://create.roblox.com/docs/reference/engine/classes/DataStoreService

## Example

```ts
import DataStoreServiceAsync from "@rbxts/datastore-promises";

const Store = DataStoreServiceAsync.GetDataStore("TestStore");

Store.SetAsync("TestKey", "a").then(() => {
	Store.GetAsync("TestKey").then(([value]) => {
		print(value); // --> a
		Store.UpdateAsync("TestKey", (oldValue) => {
			return $tuple(`hello_${oldValue}`); // -- > changes the value to hello_ + the old value
		}).then(() => {
			// it's done!
		});
	});
});

```