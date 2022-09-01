|%
+$  action
  $%
    [%pub-advertisement title=tape desc=tape forward=? price=tape img-uris=(list @ta)]
  ==
+$  advertisements  (list advertisement)
:: TODO: learn how to add images to the Ad (list of URIs for now, or
:: could be extracted from the description if it can be assumed to be a
:: markdown-like document similar to a groups post?)
:: `id` ... globally unique identifier of the ad. a random hash or
::          something...
:: `forward` ... %.y if the ad should be forwarded to pal's pals...
+$  advertisement  [publisher=ship id=@uvH date=@da forward=? title=tape desc=tape price=tape img-uris=(list @ta)]
+$  advertisements-payload  [@da advertisements]
--  
