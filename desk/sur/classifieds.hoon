|%
+$  action
  $%
    [%pub-advertisement title=tape desc=tape]
  ==
+$  advertisements  (list advertisement)
:: TODO: learn how to add images to the Ad
+$  advertisement  [publisher=ship date=@da title=tape desc=tape]
+$  initial-ads  [@da advertisements]
+$  state-0
  $:  %0
      ads=(map ship advertisements)
      myads=advertisements
  ==
--  