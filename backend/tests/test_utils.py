from backend.app.ladder import extract_json_object, is_similar


def test_is_similar_accepts_equivalent_numbers():
    assert is_similar("Answer is 12", "12")


def test_is_similar_rejects_different_results():
    assert not is_similar("5", "12")


def test_extract_json_object_success():
    payload = "Some context {\"question\": \"Q?\", \"answer\": \"A\"} extra"
    result = extract_json_object(payload)
    assert result == {"question": "Q?", "answer": "A"}


def test_extract_json_object_handles_invalid_json():
    payload = "{invalid json}"
    assert extract_json_object(payload) is None
