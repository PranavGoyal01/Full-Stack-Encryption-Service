"""
Caesar Cipher Encryption Module

Implements a simple Caesar cipher for encryption and decryption.
The Caesar cipher shifts each letter in the plaintext by a fixed number of positions.
"""


def encrypt_data(key: str, data: str) -> str:
    """
    Encrypts plain text data using Caesar cipher.

    Args:
        key: Shift value as a string (e.g., "3")
        data: Plain text string to encrypt

    Returns:
        Encrypted string with letters shifted by the key value

    Raises:
        ValueError: If key is not a valid integer
    """
    try:
        shift = int(key)
    except ValueError:
        raise ValueError("Key must be a valid integer")

    result = []
    for char in data:
        if char.isalpha():
            ascii_offset = ord('A') if char.isupper() else ord('a')
            shifted = chr((ord(char) - ascii_offset + shift) % 26 + ascii_offset)
            result.append(shifted)
        else:
            result.append(char)

    return ''.join(result)


def decrypt_data(key: str, encrypted_data: str) -> str:
    """
    Decrypts Caesar cipher encrypted data.

    Args:
        key: Shift value as a string (same as used for encryption)
        encrypted_data: Encrypted string

    Returns:
        Decrypted plain text string

    Raises:
        ValueError: If key is not a valid integer
    """
    try:
        shift = int(key)
    except ValueError:
        raise ValueError("Key must be a valid integer")

    return encrypt_data(str(-shift), encrypted_data)