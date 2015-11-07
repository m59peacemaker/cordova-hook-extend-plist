# extend plist

Adds entries into the app's plist file.

## Install

```shell
npm install cordova-hook-extend-plist
```

## Usage

Add this to `config.xml`:

```xml
<hook src="hooks/extend-plist.js" type="after_prepare" />
```

Create `hooks/extend-plist.js`:

```javascript
var ExtendPlist = require('cordova-hook-extend-plist');

module.exports = ExtendPlist({
  // plist entries
  NSAppTransportSecurity: {
    NSAllowsArbitraryLoads: true
  }
});
```

## API

### ExtendPlist(entries)

- `entries: object` | Entries to be added to the plist file.
- **returns**: `function` | the hook function
