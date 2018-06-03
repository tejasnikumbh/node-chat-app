<script id="message-template" type="text/template">
  <li class="message">
    <div class="message__title">
      <h4>{{from}}</h4>
      <span>{{createdAt}}</span>
    </div>
    <div class="message__body">
      <p>{{text}}</p>
    </div>
  </li>
</script>

<script id="location-message-template" type="text/template">
  <li class="message">
    <div class="message__title">
      <h4>{{from}}</h4>
      <span>{{createdAt}}</span>
    </div>
    <div class="message__body">
      <p>
        <a href="{{url}}" target="_blank">My current location</a>
      </p>
    </div>
  </li>
</script>
